-- Atualizar URLs das imagens dos produtos Milão
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_1.png' WHERE slug = 'jogo-de-cama-milano-1';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_1_-_casal.png' WHERE slug = 'jogo-de-cama-milano-1-casal';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_2.png' WHERE slug = 'jogo-de-cama-milano-2';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_2_-_casal.png' WHERE slug = 'jogo-de-cama-milano-2-casal';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_3.png' WHERE slug = 'jogo-de-cama-milano-3';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_3_-_casal.png' WHERE slug = 'jogo-de-cama-milano-3-casal';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_4.png' WHERE slug = 'jogo-de-cama-milano-4';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_4_-_casal.png' WHERE slug = 'jogo-de-cama-milano-4-casal';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_5.png' WHERE slug = 'jogo-de-cama-milano-5';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_5_-_casal.png' WHERE slug = 'jogo-de-cama-milano-5-casal';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_6.png' WHERE slug = 'jogo-de-cama-milano-6';
UPDATE products SET image_url = '/images/Jogo_de_Cama_Milão_6_-_casal.png' WHERE slug = 'jogo-de-cama-milano-6-casal';

-- Atualizar URLs das imagens dos produtos Travesseiro 2
UPDATE products SET image_url = '/images/Travesseiro_Alvorada_2.png' WHERE slug = 'travesseiro-alvorada-2';
UPDATE products SET image_url = '/images/Travesseiro_Bom_Sono_2.png' WHERE slug = 'travesseiro-bom-sono-2';
UPDATE products SET image_url = '/images/Travesseiro_Delicata_2.png' WHERE slug = 'travesseiro-delicata-2';
UPDATE products SET image_url = '/images/Travesseiro_Nuvare_2.png' WHERE slug = 'travesseiro-nuvare-2';

-- Criar o produto faltante: Jogo de Cama Ipanema 7 - Casal
INSERT INTO products (name, slug, category, collection, size, seo_title, seo_description, keywords, image_url, status)
VALUES (
  'Jogo de Cama Ipanema 7 - Casal',
  'jogo-de-cama-ipanema-7-casal',
  'jogo-de-cama',
  'Ipanema',
  'Casal',
  'Jogo de Cama Ipanema 7 - Casal | Leyotex',
  'Jogo de Cama Ipanema 7 tamanho Casal. Qualidade premium em produtos têxteis para o seu lar.',
  'jogo de cama, ipanema, casal, roupas de cama, lençol',
  '/images/Jogo_de_Ipanema_7_-_casal.png',
  'published'
)
ON CONFLICT (slug) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  status = EXCLUDED.status;