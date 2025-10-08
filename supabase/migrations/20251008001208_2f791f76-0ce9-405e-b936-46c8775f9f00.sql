-- Fix generate_slug function search_path
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT 
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  slug TEXT;
BEGIN
  slug := lower(input_text);
  slug := regexp_replace(slug, '[áàâãä]', 'a', 'g');
  slug := regexp_replace(slug, '[éèêë]', 'e', 'g');
  slug := regexp_replace(slug, '[íìîï]', 'i', 'g');
  slug := regexp_replace(slug, '[óòôõö]', 'o', 'g');
  slug := regexp_replace(slug, '[úùûü]', 'u', 'g');
  slug := regexp_replace(slug, '[ç]', 'c', 'g');
  slug := regexp_replace(slug, '[^a-z0-9\s-]', '', 'g');
  slug := regexp_replace(slug, '\s+', '-', 'g');
  slug := regexp_replace(slug, '-+', '-', 'g');
  slug := trim(both '-' from slug);
  RETURN slug;
END;
$$;