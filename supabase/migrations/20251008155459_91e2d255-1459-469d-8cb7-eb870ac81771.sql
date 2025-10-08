-- 1. Atualizar todos os produtos para status 'active'
UPDATE products SET status = 'active' WHERE status IN ('draft', 'published');

-- 2. Remover políticas antigas conflitantes
DROP POLICY IF EXISTS "Anyone can view products basic info" ON products;
DROP POLICY IF EXISTS "Authenticated clients can view products with prices" ON products;
DROP POLICY IF EXISTS "Authenticated users can view all products" ON products;
DROP POLICY IF EXISTS "Public can view published products" ON products;

-- 3. Criar novas políticas corretas

-- Visitantes não autenticados veem produtos sem preço
CREATE POLICY "Public can view active products"
ON products FOR SELECT
USING (status = 'active');

-- Clientes autenticados veem produtos COM preço
CREATE POLICY "Clients can view products with prices"
ON products FOR SELECT
USING (
  status = 'active' 
  AND auth.uid() IS NOT NULL 
  AND has_role(auth.uid(), 'client'::app_role)
);

-- Admins veem todos os produtos
CREATE POLICY "Admins can view all products"
ON products FOR SELECT
USING (is_admin(auth.uid()));

-- Admins podem inserir produtos
CREATE POLICY "Admins can insert products"
ON products FOR INSERT
WITH CHECK (is_admin(auth.uid()));

-- Admins podem atualizar produtos
CREATE POLICY "Admins can update products"
ON products FOR UPDATE
USING (is_admin(auth.uid()));

-- Admins podem deletar produtos
CREATE POLICY "Admins can delete products"
ON products FOR DELETE
USING (is_admin(auth.uid()));