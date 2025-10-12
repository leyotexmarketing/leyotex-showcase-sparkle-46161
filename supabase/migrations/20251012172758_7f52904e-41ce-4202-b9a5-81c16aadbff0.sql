-- Adicionar a segunda imagem ao produto Jogo de Cama Ipanema 7 - Casal
UPDATE products 
SET images = array_append(images, '/images/Jogo_de_Cama_Ipanema_7_-_casal_2.png')
WHERE id = 'a6ea043b-e132-4494-b6c4-e003d0a8f76f';