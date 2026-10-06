-- Optional seed data for local Postgres (run after schema.sql).
-- Uses fixed UUIDs so mobile seed IDs can be aligned later if desired.

INSERT INTO companies (id, name, slug, industry, location, headquarters, size, summary, founded_year)
VALUES
  ('11111111-1111-1111-1111-111111111101', 'The Home Depot', 'home-depot', 'Retail', 'Atlanta, GA', 'Atlanta, GA', '400,000+', 'Home improvement retailer with stores across North America.', 1978),
  ('11111111-1111-1111-1111-111111111102', 'Amazon', 'amazon', 'Technology', 'Seattle, WA', 'Seattle, WA', '1,500,000+', 'E-commerce, cloud, and logistics giant.', 1994),
  ('11111111-1111-1111-1111-111111111103', 'Great Bay Community College', 'great-bay-community-college', 'Education', 'Portsmouth, NH', 'Portsmouth, NH', '501–1,000', 'Community college serving the Seacoast region of New Hampshire.', NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO workplaces (id, company_id, name, store_code, address, city, state, zip, summary)
VALUES
  (
    '22222222-2222-2222-2222-222222222201',
    '11111111-1111-1111-1111-111111111101',
    'Home Depot — Portsmouth, NH',
    '#3404',
    '100 Gosling Rd',
    'Portsmouth',
    'NH',
    '03801',
    'Full-service home improvement store serving the Seacoast.'
  ),
  (
    '22222222-2222-2222-2222-222222222202',
    '11111111-1111-1111-1111-111111111103',
    'GBCC — Portsmouth Campus',
    NULL,
    '320 Corporate Dr',
    'Portsmouth',
    'NH',
    '03801',
    NULL
  )
ON CONFLICT DO NOTHING;
