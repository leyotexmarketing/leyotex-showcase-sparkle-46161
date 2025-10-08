-- 1. Adicionar política RLS em user_roles para permitir que usuários vejam suas próprias roles
CREATE POLICY "Users can view own roles"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

-- 2. Garantir que todos os produtos tenham preço R$ 100
UPDATE products SET price = 100.00;