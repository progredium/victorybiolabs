-- VictoryBioLabs Additional Products (PeptideCrafters catalog expansion)
-- Run this AFTER seed.sql in Supabase SQL editor

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('AOD-9604', 'aod-9604', 'AOD-9604 is a synthetic peptide fragment derived from the C-terminus of human growth hormone (hGH). Specifically, it corresponds to amino acids 176–191 of the hGH sequence. Unlike full-length hGH, AOD-9604 is studied primarily for its fat-metabolism properties — it mimics the lipolytic (fat-burning) action of hGH without the anabolic effects. Research has focused on its potential role in adipose tissue regulation, metabolic syndrome, and obesity-related research models.', 80, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 80, 'AOD-9604-10MG', 50 FROM products WHERE slug = 'aod-9604'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('ARA-290', 'ara-290', 'ARA-290 is an 11-amino acid cyclic peptide derived from the non-erythropoietic region of erythropoietin (EPO). Unlike EPO itself, ARA-290 does not stimulate red blood cell production but selectively activates the innate repair receptor (IRR). Research has examined its potential neuroprotective properties, ability to reduce neuroinflammation, and possible role in supporting peripheral nerve function and metabolic regulation.', 95, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '16mg', 95, 'ARA-290-16MG', 50 FROM products WHERE slug = 'ara-290'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('BPC-157 & TB-500 Blend', 'bpc-157-tb-500-blend', 'A precision-formulated research blend combining BPC-157 and TB-500 (Thymosin Beta-4 fragment). BPC-157 is studied for its role in gastrointestinal and connective tissue healing, while TB-500 is researched for its systemic tissue repair and anti-inflammatory properties. Together, this combination is widely studied in recovery research for its potential synergistic effects on musculoskeletal healing, inflammation reduction, and overall tissue regeneration.', 85, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'blends')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '24mg (12mg/12mg)', 85, 'BPC-157-TB-500-BLEND-24MG', 50 FROM products WHERE slug = 'bpc-157-tb-500-blend'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('CJC-1295 / Ipamorelin Blend', 'cjc-1295-ipamorelin-blend', 'A synergistic research blend of CJC-1295 No DAC (Mod GRF 1-29) and Ipamorelin — two complementary growth hormone secretagogues. CJC-1295 No DAC is a GHRH analogue that amplifies the pulsatile release of growth hormone, while Ipamorelin selectively stimulates GH secretion from the pituitary gland via ghrelin receptor pathways. Research has explored this combination for its potential to optimize natural GH pulse patterns, improve body composition, and support recovery, with a favorable safety profile compared to single-agent protocols.', 75, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'blends')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '12mg (6mg/6mg)', 75, 'CJC-1295-IPAMORELIN-BLEND-12MG', 50 FROM products WHERE slug = 'cjc-1295-ipamorelin-blend'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('DSIP', 'dsip', 'DSIP (Delta Sleep-Inducing Peptide) is a neuropeptide first isolated from rabbit cerebral venous blood. It has been studied for its role in modulating sleep patterns and neuroendocrine activity. Research has explored its potential effects on sleep architecture — including non-REM and REM sleep phases — as well as its interactions with the HPA axis. Additional research has examined DSIP in the context of stress response modulation and circadian rhythm regulation.', 45, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '5mg', 45, 'DSIP-5MG', 50 FROM products WHERE slug = 'dsip'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('GHK-Cu', 'ghk-cu', 'GHK-Cu (Glycine-Histidine-Lysine-Copper) is a naturally occurring copper peptide found in human plasma, saliva, and urine. It has a strong affinity for copper(II) ions and plays a complex role in biological regulation. Research has investigated GHK-Cu for its potential effects on skin remodeling, wound healing, and antioxidant activity. Studies have explored its ability to stimulate collagen and glycosaminoglycan synthesis, attract immune cells to sites of injury, and activate fibroblast activity. It is also studied for its anti-inflammatory and neuroprotective properties.', 85, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '50mg', 85, 'GHK-CU-50MG', 50 FROM products WHERE slug = 'ghk-cu'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('GLP-2', 'glp-2', 'GLP-2 (Glucagon-Like Peptide-2) is an intestinotrophic hormone co-secreted with GLP-1 by enteroendocrine L-cells in the distal gut. It binds specifically to the GLP-2 receptor expressed primarily in the intestinal epithelium, enteric nervous system, and subepithelial myofibroblasts. Research has focused on GLP-2''s role in intestinal growth and adaptation, barrier function enhancement, and suppression of intestinal inflammation. Studies have investigated its potential in models of short bowel syndrome, inflammatory bowel disease, and intestinal mucosal atrophy.', 90, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 90, 'GLP-2-10MG', 50 FROM products WHERE slug = 'glp-2'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('KPV', 'kpv', 'KPV is a tripeptide (Lys-Pro-Val) derived from the C-terminus of alpha-MSH (alpha-melanocyte-stimulating hormone). It is the shortest known biologically active fragment of alpha-MSH that retains anti-inflammatory activity. Research has explored KPV''s potential to modulate inflammatory cytokine production, reduce gut inflammation in models of colitis, and penetrate cellular and nuclear membranes to exert direct anti-inflammatory effects at the transcription level. Its small size and stability make it an attractive candidate for targeted anti-inflammatory research.', 40, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 40, 'KPV-10MG', 50 FROM products WHERE slug = 'kpv'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('L-Glutathione', 'l-glutathione', 'L-Glutathione is a tripeptide (gamma-glutamyl-cysteinyl-glycine) that serves as the body''s master intracellular antioxidant. It is synthesized in virtually all human cells and plays a central role in oxidative stress management, xenobiotic detoxification, and immune system support. Research has examined glutathione''s role in mitochondrial function, cellular redox homeostasis, and protection against oxidative damage. Studies have also explored its potential in metabolic research contexts including liver function, aging, and chronic disease models.', 80, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '1500mg', 80, 'L-GLUTATHIONE-1500MG', 50 FROM products WHERE slug = 'l-glutathione'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Melanotan 2', 'melanotan-2', 'Melanotan 2 (MT-II) is a synthetic analogue of alpha-melanocyte-stimulating hormone (alpha-MSH), a naturally occurring peptide produced by the pituitary gland. It acts as a non-selective melanocortin receptor agonist — binding to MC1R, MC3R, MC4R, and MC5R subtypes. Research has studied its effects on melanogenesis (skin pigmentation), as well as its interactions with the central nervous system through MC3R and MC4R pathways, which are implicated in energy homeostasis, sexual function, and inflammation regulation.', 65, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 65, 'MELANOTAN-2-10MG', 50 FROM products WHERE slug = 'melanotan-2'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('MOTS-c', 'mots-c', 'MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA Type-c) is a mitochondria-derived peptide (MDP) encoded within the mitochondrial genome. It plays a significant role in regulating metabolic homeostasis, particularly insulin sensitivity and cellular energy balance. Research has explored MOTS-c''s potential to activate AMPK signaling pathways, enhance mitochondrial function, and exert anti-aging effects in various tissue models. It is actively studied in the context of metabolic disease, exercise physiology, and longevity research.', 85, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 85, 'MOTS-C-10MG', 50 FROM products WHERE slug = 'mots-c'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Selank', 'selank', 'Selank is a synthetic heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro) developed by the Institute of Molecular Genetics of the Russian Academy of Sciences. It is an analogue of the endogenous tuftsin peptide. Research has studied Selank for its nootropic and anxiolytic properties, including its potential to modulate GABA-A receptor function, influence serotonin metabolism, and enhance BDNF expression. Additional studies have examined its role in cognitive function, learning and memory consolidation, and stress response modulation.', 55, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '10mg', 55, 'SELANK-10MG', 50 FROM products WHERE slug = 'selank'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('SS-31 (30mg)', 'ss-31-30mg', 'SS-31 (Elamipretide) is a mitochondria-targeting peptide that binds to cardiolipin — a phospholipid unique to the inner mitochondrial membrane. By stabilizing cardiolipin-dependent protein complexes within the electron transport chain, SS-31 is studied for its ability to improve mitochondrial ATP production, reduce reactive oxygen species (ROS) generation, and protect cells from apoptosis under energy-deprived conditions. This larger 30mg format is designed for extended research protocols and multi-model laboratory studies requiring higher compound volumes.', 120, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'peptides')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '30mg', 120, 'SS-31-30MG', 50 FROM products WHERE slug = 'ss-31-30mg'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, description, price, images, status, research_use_only, disclaimer, category)
VALUES ('Diamond Glow Blend', 'diamond-glow-blend', 'The Diamond Glow Blend is a premium multi-peptide research formulation combining three extensively studied compounds: GHK-Cu (50mg), TB-500 (10mg), and BPC-157 (10mg). GHK-Cu is researched for its copper-dependent tissue remodeling and antioxidant properties. TB-500 (Thymosin Beta-4 fragment) is studied for its systemic anti-inflammatory and tissue repair effects. BPC-157 is researched for its gastrointestinal and connective tissue regeneration properties. This high-concentration blend is designed for researchers studying multi-pathway tissue recovery, skin biology, and regenerative mechanisms at the cellular level.', 150, ARRAY['/images/products/placeholder.webp'], 'active', true, 'For research purposes only. Not intended for human consumption. Not for diagnostic, therapeutic, or medicinal use.', 'blends')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  price = EXCLUDED.price, status = EXCLUDED.status;

INSERT INTO product_variants (product_id, name, price, sku, stock_qty)
SELECT id, '70mg (50mg/10mg/10mg)', 150, 'DIAMOND-GLOW-BLEND-70MG', 50 FROM products WHERE slug = 'diamond-glow-blend'
ON CONFLICT DO NOTHING;
