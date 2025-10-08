-- Criar enum de roles
CREATE TYPE public.app_role AS ENUM ('admin', 'client');

-- Tabela de roles de usuário
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Tabela de perfis de usuário
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  cnpj TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Tabela de solicitações de contato
CREATE TABLE public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT NOT NULL,
  monthly_volume TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Tabela de newsletter
CREATE TABLE public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'active'
);

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Adicionar coluna de preço aos produtos
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 100.00;

-- Função para verificar role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Função para verificar se é admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role)
$$;

-- Função para gerar senha aleatória
CREATE OR REPLACE FUNCTION public.generate_random_password()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  password TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..12 LOOP
    password := password || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN password;
END;
$$;

-- RLS para user_roles
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert roles" ON public.user_roles
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

-- RLS para user_profiles
CREATE POLICY "Admins can view all profiles" ON public.user_profiles
FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Clients can view own profile" ON public.user_profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can insert profiles" ON public.user_profiles
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Users can update own profile" ON public.user_profiles
FOR UPDATE USING (auth.uid() = id);

-- RLS para contact_requests
CREATE POLICY "Anyone can submit contact requests" ON public.contact_requests
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all requests" ON public.contact_requests
FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update requests" ON public.contact_requests
FOR UPDATE USING (public.is_admin(auth.uid()));

-- RLS para newsletter_subscriptions
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscriptions
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view subscriptions" ON public.newsletter_subscriptions
FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS para products - clientes autenticados veem produtos com preço
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;

CREATE POLICY "Anyone can view products basic info" ON public.products
FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated clients can view products with prices" ON public.products
FOR SELECT USING (
  auth.uid() IS NOT NULL AND 
  public.has_role(auth.uid(), 'client'::app_role)
);