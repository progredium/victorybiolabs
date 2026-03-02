-- VictoryBioLabs Seed Data
-- Run AFTER schema.sql in your Supabase SQL editor

-- BPC-157
INSERT INTO products (name, slug, description, short_description, price, category, tags, status)
VALUES (
  'BPC-157',
  'bpc-157',
  'BPC-157 (Body Protection Compound-157) is a pentadecapeptide composed of 15 amino acids. Research studies investigate its role in cellular repair mechanisms, angiogenesis, and various biological pathways. This compound has been the subject of numerous laboratory and animal studies exploring its physiological properties.

Studies have examined BPC-157 in the context of musculoskeletal tissue, gastrointestinal function, and neurological research. Laboratory research suggests potential interactions with growth hormone receptors and nitric oxide systems.

All research involving this compound should be conducted by qualified researchers in appropriate laboratory settings, following all applicable regulations and ethical guidelines.',
  'Research-grade BPC-157 peptide for laboratory investigation of cellular repair mechanisms and biological pathways.',
  69.00,
  'peptides',
  ARRAY['bpc-157', 'repair', 'research', 'peptide'],
  'active'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '5mg Vial', 69.00, 50, 'BPC157-5MG', 0.005
FROM products WHERE slug = 'bpc-157'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '10mg Vial', 89.00, 30, 'BPC157-10MG', 0.010
FROM products WHERE slug = 'bpc-157'
ON CONFLICT (sku) DO NOTHING;

-- Ipamorelin
INSERT INTO products (name, slug, description, short_description, price, category, tags, status)
VALUES (
  'Ipamorelin',
  'ipamorelin',
  'Ipamorelin is a synthetic pentapeptide and selective growth hormone secretagogue. Laboratory research has explored its interactions with ghrelin receptors and growth hormone release pathways. Studies have investigated its selectivity profile compared to other secretagogues, noting its research-characterized specificity.

Preclinical research has examined Ipamorelin in the context of metabolic studies, body composition research, and endocrine system investigation. This compound is utilized by researchers studying the GH/IGF-1 axis and related biological mechanisms.

For use in certified research facilities only. Researchers should follow all institutional protocols and applicable regulations when working with this compound.',
  'Research-grade Ipamorelin for laboratory investigation of growth hormone secretagogue pathways and GH/IGF-1 axis mechanisms.',
  49.00,
  'peptides',
  ARRAY['ipamorelin', 'secretagogue', 'research', 'peptide'],
  'active'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '2mg Vial', 49.00, 60, 'IPA-2MG', 0.002
FROM products WHERE slug = 'ipamorelin'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '5mg Vial', 65.00, 45, 'IPA-5MG', 0.005
FROM products WHERE slug = 'ipamorelin'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '10mg Vial', 79.00, 30, 'IPA-10MG', 0.010
FROM products WHERE slug = 'ipamorelin'
ON CONFLICT (sku) DO NOTHING;

-- Retatrutide
INSERT INTO products (name, slug, description, short_description, price, category, tags, status)
VALUES (
  'Retatrutide',
  'retatrutide',
  'Retatrutide (LY3437943) is a triple agonist peptide investigated for its activity at GIP, GLP-1, and glucagon receptors. Research has characterized its binding affinities and receptor activation profiles across these three receptor systems.

Laboratory and clinical research studies have investigated Retatrutide in the context of metabolic biology, with published studies examining glucose metabolism, lipid regulation, and body composition parameters in research settings.

This compound is provided for qualified researchers studying multi-receptor agonism and metabolic signaling pathways. All use must comply with applicable research regulations and institutional review protocols.',
  'Research-grade Retatrutide triple agonist peptide for investigation of GIP, GLP-1, and glucagon receptor biology.',
  149.00,
  'peptides',
  ARRAY['retatrutide', 'triple-agonist', 'metabolic', 'research'],
  'active'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '2mg Vial', 149.00, 25, 'RET-2MG', 0.002
FROM products WHERE slug = 'retatrutide'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '5mg Vial', 229.00, 20, 'RET-5MG', 0.005
FROM products WHERE slug = 'retatrutide'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '10mg Vial', 339.00, 15, 'RET-10MG', 0.010
FROM products WHERE slug = 'retatrutide'
ON CONFLICT (sku) DO NOTHING;

-- Semaglutide
INSERT INTO products (name, slug, description, short_description, price, category, tags, status)
VALUES (
  'Semaglutide',
  'semaglutide',
  'Semaglutide is a GLP-1 receptor agonist peptide analog. Research has extensively characterized its pharmacological properties, including its extended half-life compared to native GLP-1. Academic and pharmaceutical research has investigated its molecular interactions with GLP-1 receptors and downstream signaling cascades.

Published literature explores semaglutide in the context of pancreatic beta-cell biology, cardiovascular signaling research, and metabolic pathway studies. This compound is used in laboratory settings for receptor binding studies, signaling pathway investigation, and related research applications.

Provided for qualified researchers and research institutions only.',
  'Research-grade Semaglutide GLP-1 receptor agonist for laboratory investigation of metabolic signaling and receptor biology.',
  79.00,
  'peptides',
  ARRAY['semaglutide', 'glp-1', 'metabolic', 'research'],
  'active'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '2mg Vial', 79.00, 40, 'SEM-2MG', 0.002
FROM products WHERE slug = 'semaglutide'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '5mg Vial', 129.00, 30, 'SEM-5MG', 0.005
FROM products WHERE slug = 'semaglutide'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '10mg Vial', 199.00, 20, 'SEM-10MG', 0.010
FROM products WHERE slug = 'semaglutide'
ON CONFLICT (sku) DO NOTHING;

-- Tesamorelin
INSERT INTO products (name, slug, description, short_description, price, category, tags, status)
VALUES (
  'Tesamorelin',
  'tesamorelin',
  'Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH). Research investigations have characterized its interactions with GHRH receptors and downstream GH secretion pathways. Laboratory studies have examined its stability profile and receptor binding characteristics relative to native GHRH.

Research publications have explored tesamorelin in the context of growth hormone axis biology, lipid metabolism studies, and endocrine system research. This compound is utilized by researchers studying GHRH receptor pharmacology and related biological systems.

For use by qualified researchers in certified laboratory environments only.',
  'Research-grade Tesamorelin GHRH analog for investigation of growth hormone axis biology and receptor pharmacology.',
  59.00,
  'peptides',
  ARRAY['tesamorelin', 'ghrh', 'growth-hormone', 'research'],
  'active'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '2mg Vial', 59.00, 35, 'TES-2MG', 0.002
FROM products WHERE slug = 'tesamorelin'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '5mg Vial', 79.00, 25, 'TES-5MG', 0.005
FROM products WHERE slug = 'tesamorelin'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '10mg Vial', 99.00, 20, 'TES-10MG', 0.010
FROM products WHERE slug = 'tesamorelin'
ON CONFLICT (sku) DO NOTHING;

-- Tirzepatide
INSERT INTO products (name, slug, description, short_description, price, category, tags, status)
VALUES (
  'Tirzepatide',
  'tirzepatide',
  'Tirzepatide is a dual GIP and GLP-1 receptor agonist peptide. Research has characterized its simultaneous activity at both glucose-dependent insulinotropic polypeptide (GIP) receptors and glucagon-like peptide-1 (GLP-1) receptors, making it a subject of significant scientific interest.

Laboratory research investigates tirzepatide in the context of incretin biology, receptor co-agonism studies, and metabolic signaling pathway research. Published studies have examined its molecular pharmacology and receptor interaction profiles in preclinical research models.

Intended for qualified researchers studying dual incretin receptor biology and related metabolic pathways.',
  'Research-grade Tirzepatide dual GIP/GLP-1 receptor agonist for investigation of incretin biology and metabolic signaling.',
  119.00,
  'peptides',
  ARRAY['tirzepatide', 'dual-agonist', 'incretin', 'research'],
  'active'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '2mg Vial', 119.00, 30, 'TIR-2MG', 0.002
FROM products WHERE slug = 'tirzepatide'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '5mg Vial', 179.00, 25, 'TIR-5MG', 0.005
FROM products WHERE slug = 'tirzepatide'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '10mg Vial', 249.00, 15, 'TIR-10MG', 0.010
FROM products WHERE slug = 'tirzepatide'
ON CONFLICT (sku) DO NOTHING;

-- SS-31 / Elamipretide
INSERT INTO products (name, slug, description, short_description, price, compare_price, category, tags, status)
VALUES (
  'SS-31 / Elamipretide',
  'ss-31-elamipretide',
  'SS-31 (also known as Elamipretide or MTP-131) is a mitochondria-targeting tetrapeptide. Research has characterized its interactions with cardiolipin, a phospholipid found in the inner mitochondrial membrane. Laboratory studies have investigated its effects on mitochondrial structure and bioenergetics in research settings.

Scientific publications have examined SS-31 in the context of mitochondrial biology research, cellular energetics studies, and related experimental models. Researchers utilize this compound for investigations into mitochondrial membrane dynamics and related cellular processes.

For research use only by qualified scientists in appropriate laboratory settings.',
  'Research-grade SS-31/Elamipretide mitochondria-targeting tetrapeptide for investigation of mitochondrial biology and cellular energetics.',
  45.00,
  60.00,
  'peptides',
  ARRAY['ss-31', 'elamipretide', 'mitochondria', 'research'],
  'active'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO product_variants (product_id, name, price, stock_qty, sku, weight_g)
SELECT id, '5mg Vial', 45.00, 40, 'SS31-5MG', 0.005
FROM products WHERE slug = 'ss-31-elamipretide'
ON CONFLICT (sku) DO NOTHING;

-- Coming soon placeholders
INSERT INTO products (name, slug, description, short_description, price, category, tags, status)
VALUES
  ('CJC-1295', 'cjc-1295', 'Coming soon. CJC-1295 is a synthetic analog of growth hormone-releasing hormone (GHRH) with extended half-life. Research investigations focus on its interactions with GHRH receptors.', 'Research-grade CJC-1295 GHRH analog — coming soon.', 79.00, 'peptides', ARRAY['cjc-1295', 'ghrh', 'research'], 'coming_soon'),
  ('TB-500 / Thymosin Beta-4', 'tb-500', 'Coming soon. TB-500 is a synthetic version of the naturally occurring peptide Thymosin Beta-4. Research explores its role in actin binding and cellular migration studies.', 'Research-grade TB-500 / Thymosin Beta-4 — coming soon.', 65.00, 'peptides', ARRAY['tb-500', 'thymosin', 'research'], 'coming_soon'),
  ('Epithalon', 'epithalon', 'Coming soon. Epithalon (Epitalon) is a synthetic tetrapeptide. Research investigates its interactions with the pineal gland and telomere biology.', 'Research-grade Epithalon tetrapeptide — coming soon.', 55.00, 'peptides', ARRAY['epithalon', 'telomere', 'research'], 'coming_soon'),
  ('Selank', 'selank', 'Coming soon. Selank is a synthetic heptapeptide analog of tuftsin. Research explores its interactions with GABAergic and serotonergic systems in laboratory settings.', 'Research-grade Selank heptapeptide — coming soon.', 49.00, 'peptides', ARRAY['selank', 'anxiolytic', 'research'], 'coming_soon'),
  ('MOTS-c', 'mots-c', 'Coming soon. MOTS-c is a mitochondria-derived peptide. Research investigates its role in metabolic regulation and mitochondrial retrograde signaling pathways.', 'Research-grade MOTS-c mitochondrial peptide — coming soon.', 89.00, 'peptides', ARRAY['mots-c', 'mitochondria', 'research'], 'coming_soon')
ON CONFLICT (slug) DO NOTHING;
