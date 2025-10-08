import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabaseAdmin.auth.getUser(token);

    if (!user) {
      throw new Error("Não autorizado");
    }

    // Verificar se é admin
    const { data: isAdmin } = await supabaseAdmin.rpc("is_admin", {
      _user_id: user.id,
    });

    if (!isAdmin) {
      throw new Error("Apenas administradores podem aprovar clientes");
    }

    const { request_id } = await req.json();

    // Buscar solicitação
    const { data: request, error: requestError } = await supabaseAdmin
      .from("contact_requests")
      .select("*")
      .eq("id", request_id)
      .single();

    if (requestError || !request) {
      throw new Error("Solicitação não encontrada");
    }

    // Gerar senha aleatória
    const { data: passwordData } = await supabaseAdmin.rpc(
      "generate_random_password"
    );
    const randomPassword = passwordData;

    // Criar usuário no Auth
    const { data: newUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: request.email,
      password: randomPassword,
      email_confirm: true,
      user_metadata: {
        full_name: request.contact_name,
        company_name: request.company_name,
      },
    });

    if (authError || !newUser.user) {
      throw new Error(`Erro ao criar usuário: ${authError?.message}`);
    }

    // Criar perfil
    await supabaseAdmin.from("user_profiles").insert({
      id: newUser.user.id,
      email: request.email,
      full_name: request.contact_name,
      company_name: request.company_name,
      cnpj: request.cnpj,
      phone: request.phone,
    });

    // Adicionar role de cliente
    await supabaseAdmin.from("user_roles").insert({
      user_id: newUser.user.id,
      role: "client",
    });

    // Atualizar status da solicitação
    await supabaseAdmin
      .from("contact_requests")
      .update({
        status: "approved",
        approved_by: user.id,
        approved_at: new Date().toISOString(),
      })
      .eq("id", request_id);

    return new Response(
      JSON.stringify({
        success: true,
        email: request.email,
        password: randomPassword,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Erro ao aprovar cliente:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
