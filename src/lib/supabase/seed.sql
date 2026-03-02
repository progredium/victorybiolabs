-- Seed: VictoryBioLabs Products (scraped from VictoryPeptides.com)
-- Run this in Supabase SQL editor

DELETE FROM product_variants;
DELETE FROM products;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('BPC-157', 'bpc-157', 'BPC-157 is a synthetic peptide fragment studied for its potential to accelerate the healing of tendons, ligaments, muscles, and even gut tissue. Research suggests it may support tissue regeneration, reduce inflammation, and improve recovery after injury.', 69, '["/images/products/bpc-157-1.webp","/images/products/bpc-157-2.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '5mg', 69, 'BPC-157-5MG', 50 FROM products WHERE slug = 'bpc-157'
ON CONFLICT DO NOTHING;
INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 89, 'BPC-157-10MG', 50 FROM products WHERE slug = 'bpc-157'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Ipamorelin', 'ipamorelin', 'Ipamorelin is a selective growth hormone secretagogue studied for its ability to stimulate natural growth hormone release. Research has explored its potential in muscle growth, fat reduction, and recovery support, with minimal effects on cortisol or appetite.', 49, '["/images/products/ipamorelin-1.webp","/images/products/ipamorelin-2.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '5mg', 49, 'IPAMORELIN-5MG', 50 FROM products WHERE slug = 'ipamorelin'
ON CONFLICT DO NOTHING;
INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 79, 'IPAMORELIN-10MG', 50 FROM products WHERE slug = 'ipamorelin'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Tirzepatide', 'tirzepatide', 'Tirzepatide is a powerful, once-weekly injectable medication designed to help adults manage type 2 diabetes and achieve meaningful weight loss. It works by activating two key hormone receptors—GLP-1 and GIP—to regulate blood sugar levels and control appetite more effectively than traditional medications.
Whether you’re aiming to improve blood glucose control or reduce body weight, Tirzepatide offers a modern, science-backed solution.', 119, '["/images/products/tirzepatide-1.webp","/images/products/tirzepatide-2.webp","/images/products/tirzepatide-3.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 119, 'TIRZEPATIDE-10MG', 50 FROM products WHERE slug = 'tirzepatide'
ON CONFLICT DO NOTHING;
INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '20mg', 179, 'TIRZEPATIDE-20MG', 50 FROM products WHERE slug = 'tirzepatide'
ON CONFLICT DO NOTHING;
INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '30mg', 249, 'TIRZEPATIDE-30MG', 50 FROM products WHERE slug = 'tirzepatide'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Semaglutide', 'semaglutide', 'Semaglutide is a GLP-1 receptor agonist studied for its effects on glucose regulation and appetite suppression. Research has explored its role in supporting weight management, metabolic health, and improved insulin response.', 79, '["/images/products/semaglutide-1.webp","/images/products/semaglutide-2.webp","/images/products/semaglutide-3.webp","/images/products/semaglutide-4.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 79, 'SEMAGLUTIDE-10MG', 50 FROM products WHERE slug = 'semaglutide'
ON CONFLICT DO NOTHING;
INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '20mg', 139, 'SEMAGLUTIDE-20MG', 50 FROM products WHERE slug = 'semaglutide'
ON CONFLICT DO NOTHING;
INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '30mg', 199, 'SEMAGLUTIDE-30MG', 50 FROM products WHERE slug = 'semaglutide'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Retatrutide', 'retatrutide', 'Retatrutide is triple hormone receptor activity, targeting GLP-1, GIP, and glucagon receptors—all critical to regulating metabolism, blood sugar, and appetite. Research has focused on its potential to support weight management, improve metabolic function, and enhance glucose regulation.', 149, '["/images/products/retatrutide-1.webp","/images/products/retatrutide-2.webp","/images/products/retatrutide-3.webp","/images/products/retatrutide-4.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 149, 'RETATRUTIDE-10MG', 50 FROM products WHERE slug = 'retatrutide'
ON CONFLICT DO NOTHING;
INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '20mg', 239, 'RETATRUTIDE-20MG', 50 FROM products WHERE slug = 'retatrutide'
ON CONFLICT DO NOTHING;
INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '30mg', 339, 'RETATRUTIDE-30MG', 50 FROM products WHERE slug = 'retatrutide'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Tesamorelin', 'tesamorelin', 'Tesamorelin is a synthetic peptide analogue of growth hormone–releasing hormone (GHRH). It is studied for its ability to stimulate natural growth hormone production, with research exploring applications in fat metabolism, muscle preservation, and improved body composition.', 59, '["/images/products/tesamorelin-1.webp","/images/products/tesamorelin-2.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '5mg', 59, 'TESAMORELIN-5MG', 50 FROM products WHERE slug = 'tesamorelin'
ON CONFLICT DO NOTHING;
INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 99, 'TESAMORELIN-10MG', 50 FROM products WHERE slug = 'tesamorelin'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('SS-31 (Elamipretide)', 'ss-31', 'SS-31 (Elamipretide) is a mitochondria-targeting research peptide studied for its potential to protect and restore cellular energy production. It works by binding to cardiolipin, a lipid critical for mitochondrial function, and is thought to improve energy efficiency, reduce oxidative stress, and support cellular survival under stress conditions. Research has explored SS-31 in areas such as age-related decline, muscle performance, cardiovascular health, and neuroprotection, making it of great interest in longevity and metabolic studies.', 45, '["/images/products/ss-31-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 45, 'SS-31-10MG', 50 FROM products WHERE slug = 'ss-31'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('HCG', 'hcg-5mg', 'HCG (Human Chorionic Gonadotropin) is a hormone studied for its role in hormone balance, reproductive function, and testosterone stimulation. Research has explored its potential in fertility support and muscle preservation during caloric restriction.', 99, '["/images/products/hcg-5mg-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '5mg', 99, 'HCG-5MG-5MG', 50 FROM products WHERE slug = 'hcg-5mg'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Hexarelin', 'hexarelin-5mg', 'Hexarelin is a synthetic growth hormone secretagogue studied for its ability to stimulate growth hormone release. Research has explored its potential in muscle development, fat metabolism, and cardiovascular support.', 39, '["/images/products/hexarelin-5mg-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '5mg', 39, 'HEXARELIN-5MG-5MG', 50 FROM products WHERE slug = 'hexarelin-5mg'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('NAD+', 'nad', 'NAD+ (Nicotinamide Adenine Dinucleotide) is a vital coenzyme found in every living cell. It plays a central role in cellular energy production, DNA repair, and overall metabolic function. As we age, NAD+ levels decline, contributing to reduced energy, cognitive function, and resilience against disease. Supplementing or boosting NAD+ is a promising strategy for enhancing longevity and overall health.', 119, '["/images/products/nad-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '500mg', 119, 'NAD-500MG', 50 FROM products WHERE slug = 'nad'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Semax', 'semax-5mg', 'Semax is a synthetic peptide derived from adrenocorticotropic hormone (ACTH) fragments. It is studied for its potential neuroprotective and nootropic effects, with research exploring roles in cognitive function, memory, and recovery from neurological stress.', 49, '["/images/products/semax-5mg-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '5mg', 49, 'SEMAX-5MG-5MG', 50 FROM products WHERE slug = 'semax-5mg'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Sermorelin', 'sermorelin-5mg', 'Sermorelin is a synthetic peptide that functions as a growth hormone–releasing hormone (GHRH) analogue. It is studied for its ability to stimulate natural growth hormone production, with research exploring benefits in recovery, body composition, and healthy aging.', 29, '["/images/products/sermorelin-5mg-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '5mg', 29, 'SERMORELIN-5MG-5MG', 50 FROM products WHERE slug = 'sermorelin-5mg'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Snap-8', 'snap-8', 'Snap-8 is a topical anti-wrinkle peptide often referred to as a “Botox alternative.” It is a synthetic octapeptide that works by reducing muscle contractions that cause expression lines, particularly on the forehead and around the eyes. As a safer, non-invasive alternative to botulinum toxin injections, Snap-8 is widely used in anti-aging skincare products to smooth dynamic wrinkles and improve skin appearance.', 69, '["/images/products/snap-8-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 69, 'SNAP-8-10MG', 50 FROM products WHERE slug = 'snap-8'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Thymosin Alpha-1', 'thymosin-alpha-1', 'Thymosin Alpha-1 is a naturally occurring peptide fragment studied for its role in immune system modulation. Research has explored its potential to enhance immune response, regulate inflammation, and support overall immune balance.', 99, '["/images/products/thymosin-alpha-1-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 99, 'THYMOSIN-ALPHA-1-10MG', 50 FROM products WHERE slug = 'thymosin-alpha-1'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Vitamin B12', 'vitamin-b12', 'Vitamin B12 (cobalamin) is a water-soluble vitamin essential for energy production, red blood cell formation, neurological function, and DNA synthesis. Since the body cannot produce B12 on its own, it must be obtained from food or supplements. Deficiency is common, especially in vegans, older adults, and individuals with absorption issues, and can lead to fatigue, brain fog, anemia, and nerve damage.', 69, '["/images/products/vitamin-b12-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '50ml', 69, 'VITAMIN-B12-50ML', 50 FROM products WHERE slug = 'vitamin-b12'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Weight Loss Starter Pack', 'weight-loss-starter-pack', '10mg of Tirzepatide. Five individually wrapped needles. 3ml of Bacteriostatic Water.', 99, '["/images/products/weight-loss-starter-pack-1.webp"]'::jsonb, 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, images = EXCLUDED.images, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, 'Kit', 99, 'WEIGHT-LOSS-STARTER-PACK-KIT', 50 FROM products WHERE slug = 'weight-loss-starter-pack'
ON CONFLICT DO NOTHING;

