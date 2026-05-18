-- Migration 008: Remove unused why_japanese_page section
-- This section was created temporarily and is not used by any page.

-- Safety check first (run this SELECT to confirm before deleting):
-- SELECT * FROM homepage_sections WHERE section_key = 'why_japanese_page';

DELETE FROM homepage_sections
WHERE section_key = 'why_japanese_page';
