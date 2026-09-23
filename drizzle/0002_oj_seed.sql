-- Seed OJ demo creators + posts (fixed UUIDs for local/prod bootstrap)
-- Apply after 0001_oj_monetization.sql

INSERT INTO oj_creators (id, username, display_name, bio, city, tier_name, tier_price_cents, banner_hue)
VALUES
  ('11111111-1111-4111-8111-111111111111', 'maya.kill', 'Maya Kill',
   'Road comic. Raw writing-lab audio, uncut crowdwork, and the special the clubs won’t book clean.',
   'Brooklyn, NY', 'Backstage', 900, 18),
  ('22222222-2222-4222-8222-222222222222', 'frame.roast', 'Frame Roast',
   'Comedy animator. Hand-drawn shorts that never make it past brand-safe YouTube.',
   'Los Angeles, CA', 'Ink Club', 700, 210),
  ('33333333-3333-4333-8333-333333333333', 'devonroast', 'Devon Roast',
   'Late rooms only. Premises, voice memos, and full indie specials for people who can take a joke.',
   'Chicago, IL', 'Green Room', 1200, 32)
ON CONFLICT (username) DO NOTHING;

INSERT INTO oj_posts (id, creator_id, kind, access, title, body, duration_label, tip_total_cents, created_at)
VALUES
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1', '11111111-1111-4111-8111-111111111111', 'video', 'public',
   'Crowdwork kill — Mic & Mirror', 'Four minutes, no vanity cutaways. The crypto guy in row three.',
   '4:12', 8400, '2026-08-16T20:10:00Z'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2', '22222222-2222-4222-8222-222222222222', 'animation', 'public',
   'Plant Union (teaser)', 'Thirty-second animated premise. Full short unlocks for Ink Club.',
   '0:32', 4100, '2026-08-16T18:40:00Z'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3', '11111111-1111-4111-8111-111111111111', 'audio', 'supporters',
   'Writing lab — moving home at 32', 'Unedited voice memo. Tags, false starts, and the punch that landed at Brick.',
   '11:08', 15600, '2026-08-16T15:05:00Z'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4', '33333333-3333-4333-8333-333333333333', 'video', 'supporters',
   'Indie special: After the Lottery', 'Full 48-minute set. No network edit. No laugh track.',
   '48:03', 62000, '2026-08-15T23:20:00Z'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5', '33333333-3333-4333-8333-333333333333', 'text', 'public',
   'Open mic — Allston After Fri', 'Hosting late. 5 comics · 5 minutes. Political free-for-all, funny first.',
   NULL, 1800, '2026-08-15T19:00:00Z'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa6', '22222222-2222-4222-8222-222222222222', 'animation', 'supporters',
   'Plant Union — full short', 'Animated comedy short. The bargaining scene the brands wouldn’t touch.',
   '3:44', 21000, '2026-08-15T14:30:00Z'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa7', '11111111-1111-4111-8111-111111111111', 'video', 'public',
   'Premise drop: therapy group project', 'Public teaser. Full tag workshop lives behind Backstage.',
   '1:05', 3300, '2026-08-14T21:15:00Z'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa8', '33333333-3333-4333-8333-333333333333', 'audio', 'supporters',
   'Road notes — Toledo to Cleveland', 'Raw car audio. What died, what got a second life, what to never try clean.',
   '22:41', 9700, '2026-08-14T11:00:00Z')
ON CONFLICT (id) DO NOTHING;
