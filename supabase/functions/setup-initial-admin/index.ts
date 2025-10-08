import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log('Verificando se já existe um admin...');
    
    // Verifica se já existe algum admin
    const { data: existingAdmins, error: checkError } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    if (checkError) {
      console.error('Erro ao verificar admins existentes:', checkError);
      throw checkError;
    }

    if (existingAdmins && existingAdmins.length > 0) {
      console.log('Admin já existe no sistema');
      return new Response(
        JSON.stringify({ 
          error: 'Já existe um administrador no sistema',
          message: 'O usuário admin já foi criado anteriormente'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Criando usuário admin...');
    
    // Cria o usuário admin
    const adminEmail = 'leyotex.marketing@gmail.com';
    const adminPassword = 'AdminLeyotex26$';
    
    const { data: userData, error: createUserError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Confirma o email automaticamente
      user_metadata: {
        full_name: 'Administrador Leyotex'
      }
    });

    if (createUserError) {
      console.error('Erro ao criar usuário:', createUserError);
      throw createUserError;
    }

    console.log('Usuário criado com sucesso:', userData.user.id);

    // Cria o perfil do usuário
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: userData.user.id,
        email: adminEmail,
        full_name: 'Administrador Leyotex',
        company_name: 'Leyotex'
      });

    if (profileError) {
      console.error('Erro ao criar perfil:', profileError);
      throw profileError;
    }

    console.log('Perfil criado com sucesso');

    // Atribui a role de admin
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userData.user.id,
        role: 'admin'
      });

    if (roleError) {
      console.error('Erro ao atribuir role:', roleError);
      throw roleError;
    }

    console.log('Role de admin atribuída com sucesso');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Usuário admin criado com sucesso',
        credentials: {
          email: adminEmail,
          password: adminPassword
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Erro na função setup-initial-admin:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Erro ao configurar admin inicial'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
