-- Development seed. Run after applying the migration.
insert into public.venues (id, name, address) values
 ('00000000-0000-0000-0000-000000000001', 'Incheon Partner Hanok', 'Jung-gu, Incheon'),
 ('00000000-0000-0000-0000-000000000002', 'Songdo Art House', 'Yeonsu-gu, Incheon') on conflict do nothing;
insert into public.creators (id, slug, name_ko, name_en, bio_en, bio_ko) values
 ('00000000-0000-0000-0000-000000000011','kim-hana','김하나','Kim Hana','Gayageum artist and experience guide.','가야금 예술인이자 체험 안내자입니다.'),
 ('00000000-0000-0000-0000-000000000012','lee-sujin','이수진','Lee Sujin','Korean knot artist and maker.','전통매듭 작가입니다.'),
 ('00000000-0000-0000-0000-000000000013','park-yunseo','박윤서','Park Yunseo','Minhwa artist and teacher.','민화 작가이자 교육자입니다.') on conflict do nothing;
insert into public.experiences (slug, category, title_ko, title_en, description_ko, description_en, creator_id, base_price, duration_minutes, min_guests, max_guests, difficulty, status) values
 ('gayageum','Traditional music','줄을 다루는 솜씨','Gayageum Experience','가야금의 구조와 소리를 이해하고 직접 연주합니다.','Learn the instrument through touch, sound, and a short melody.', '00000000-0000-0000-0000-000000000011',99000,90,1,6,'Beginner','PUBLISHED'),
 ('knot','Traditional craft','매듭을 다루는 솜씨','Korean Knot Experience','전통매듭을 배우고 작은 결과물을 완성합니다.','Choose a cord, learn a knot, and take home your keepsake.', '00000000-0000-0000-0000-000000000012',79000,90,1,6,'Beginner','PUBLISHED'),
 ('minhwa','Folk painting','빛깔을 다루는 솜씨','Minhwa Experience','민화의 상징과 색을 이해하고 작품을 만듭니다.','Explore folk painting symbols and make your own artwork.', '00000000-0000-0000-0000-000000000013',89000,120,1,6,'Beginner','PUBLISHED') on conflict do nothing;
insert into public.options (code,name_ko,name_en,description,price,pricing_type) values
 ('HANBOK','한복','Hanbok','Traditional dress experience.',20000,'PER_PERSON'), ('TEA_SNACK','전통차·다과','Tea & sweets','Tea and small sweets.',10000,'PER_PERSON'), ('PHOTO','사진 촬영','Photo package','Keep the moment.',20000,'PER_BOOKING') on conflict do nothing;
insert into public.sessions (experience_id,creator_id,venue_id,start_at,end_at,capacity,booked_count,status)
 select e.id,e.creator_id,'00000000-0000-0000-0000-000000000001'::uuid,'2026-10-20 10:30+09'::timestamptz,'2026-10-20 12:00+09'::timestamptz,6,2,'OPEN' from public.experiences e where e.slug='gayageum'
 union all select e.id,e.creator_id,'00000000-0000-0000-0000-000000000001'::uuid,'2026-10-20 15:00+09'::timestamptz,'2026-10-20 16:30+09'::timestamptz,6,4,'OPEN' from public.experiences e where e.slug='gayageum'
 union all select e.id,e.creator_id,'00000000-0000-0000-0000-000000000002'::uuid,'2026-10-22 14:00+09'::timestamptz,'2026-10-22 15:30+09'::timestamptz,6,1,'OPEN' from public.experiences e where e.slug='knot';
