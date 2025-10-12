-- Corrigir imagem do produto Jogo de Cama Ipanema 7 - Casal
UPDATE products
SET
  image_url = '/images/Jogo_de_Cama_Ipanema_7_-_casal_2.png',
  images = ARRAY['/images/Jogo_de_Cama_Ipanema_7_-_casal_2.png'] || COALESCE(
    ARRAY(
      SELECT img
      FROM unnest(images) AS img
      WHERE img IS NOT NULL
        AND img <> '/images/Jogo_de_Cama_Ipanema_7_-_casal_2.png'
        AND img <> '/images/Jogo_de_Ipanema_7_-_casal.png'
    ),
    ARRAY[]::text[]
  ),
  updated_at = now()
WHERE slug = 'jogo-de-cama-ipanema-7-casal';