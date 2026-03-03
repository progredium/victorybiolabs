-- VictoryBioLabs COA Seed Data (placeholder lab results for all products)
-- Run this AFTER schema.sql, seed.sql, and seed-additional.sql

-- ============================================================
-- Existing Products (from seed.sql)
-- ============================================================

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'BPC-157', 'VBL-2025-0142', '2024-08-15', '2026-08-15', 99.6, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.8%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'bpc-157'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Ipamorelin', 'VBL-2025-0157', '2024-09-02', '2026-09-02', 99.4, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "4.1%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'ipamorelin'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Tirzepatide', 'VBL-2025-0189', '2024-09-18', '2026-09-18', 99.7, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.5%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'tirzepatide'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Semaglutide', 'VBL-2025-0203', '2024-10-05', '2026-10-05', 99.5, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "4.0%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'semaglutide'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Retatrutide', 'VBL-2025-0215', '2024-10-22', '2026-10-22', 99.3, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.9%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'retatrutide'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Tesamorelin', 'VBL-2025-0228', '2024-11-08', '2026-11-08', 99.6, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.7%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'tesamorelin'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'SS-31 (Elamipretide)', 'VBL-2025-0241', '2024-11-20', '2026-11-20', 99.8, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.4%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'ss-31'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'HCG', 'VBL-2025-0259', '2024-12-03', '2026-12-03', 99.2, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "4.3%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'hcg-5mg'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Hexarelin', 'VBL-2025-0274', '2024-12-15', '2026-12-15', 99.4, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.6%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'hexarelin-5mg'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'NAD+', 'VBL-2025-0288', '2025-01-07', '2027-01-07', 99.1, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "4.5%", "appearance": "White crystalline powder"}'::jsonb
FROM products WHERE slug = 'nad'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Semax', 'VBL-2025-0301', '2025-01-15', '2027-01-15', 99.5, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.8%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'semax-5mg'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Sermorelin', 'VBL-2025-0318', '2024-08-28', '2026-08-28', 99.3, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "4.0%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'sermorelin-5mg'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Snap-8', 'VBL-2025-0332', '2024-09-10', '2026-09-10', 99.6, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.5%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'snap-8'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Thymosin Alpha-1', 'VBL-2025-0347', '2024-09-25', '2026-09-25', 99.7, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.9%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'thymosin-alpha-1'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Vitamin B12', 'VBL-2025-0361', '2024-10-12', '2026-10-12', 99.4, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "2.1%", "appearance": "Dark red crystalline powder"}'::jsonb
FROM products WHERE slug = 'vitamin-b12'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Weight Loss Starter Pack', 'VBL-2025-0379', '2024-10-28', '2026-10-28', 99.5, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.7%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'weight-loss-starter-pack'
ON CONFLICT DO NOTHING;

-- ============================================================
-- New Products (from seed-additional.sql)
-- ============================================================

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'AOD-9604', 'VBL-2025-0392', '2024-11-05', '2026-11-05', 99.6, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.8%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'aod-9604'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'ARA-290', 'VBL-2025-0408', '2024-11-18', '2026-11-18', 99.3, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "4.2%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'ara-290'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'BPC-157 & TB-500 Blend', 'VBL-2025-0421', '2024-12-01', '2026-12-01', 99.4, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Both peptides confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.9%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'bpc-157-tb-500-blend'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'CJC-1295 / Ipamorelin Blend', 'VBL-2025-0437', '2024-12-14', '2026-12-14', 99.5, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Both peptides confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "4.0%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'cjc-1295-ipamorelin-blend'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'DSIP', 'VBL-2025-0449', '2025-01-06', '2027-01-06', 99.7, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.6%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'dsip'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'GHK-Cu', 'VBL-2025-0462', '2025-01-14', '2027-01-14', 99.2, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "copper_ratio": "1:1 chelation confirmed", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.5%", "appearance": "Blue-green lyophilized powder"}'::jsonb
FROM products WHERE slug = 'ghk-cu'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'GLP-2', 'VBL-2025-0478', '2024-08-20', '2026-08-20', 99.4, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "4.1%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'glp-2'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'KPV', 'VBL-2025-0491', '2024-09-05', '2026-09-05', 99.8, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "2.9%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'kpv'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'L-Glutathione', 'VBL-2025-0504', '2024-09-22', '2026-09-22', 99.1, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.3%", "appearance": "White crystalline powder"}'::jsonb
FROM products WHERE slug = 'l-glutathione'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Melanotan 2', 'VBL-2025-0517', '2024-10-08', '2026-10-08', 99.5, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.7%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'melanotan-2'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'MOTS-c', 'VBL-2025-0533', '2024-10-24', '2026-10-24', 99.6, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "4.0%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'mots-c'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Selank', 'VBL-2025-0546', '2024-11-10', '2026-11-10', 99.3, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.8%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'selank'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'SS-31 (30mg)', 'VBL-2025-0558', '2024-11-25', '2026-11-25', 99.8, 'HPLC-MS', 'Intertek Pharmaceutical Services',
  '{"identity": "Confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.4%", "appearance": "White lyophilized powder"}'::jsonb
FROM products WHERE slug = 'ss-31-30mg'
ON CONFLICT DO NOTHING;

INSERT INTO coas (product_id, product_name, lot_number, test_date, expiry_date, purity_percent, test_method, lab_name, results)
SELECT id, 'Diamond Glow Blend', 'VBL-2025-0572', '2024-12-10', '2026-12-10', 99.4, 'HPLC-MS', 'Eurofins Scientific',
  '{"identity": "All 3 peptides confirmed by MS", "endotoxin": "<0.5 EU/mg", "sterility": "Pass", "moisture": "3.9%", "appearance": "White-blue lyophilized powder"}'::jsonb
FROM products WHERE slug = 'diamond-glow-blend'
ON CONFLICT DO NOTHING;
