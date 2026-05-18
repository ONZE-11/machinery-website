-- =============================================================================
-- MIGRATION 006 — homepage_sections: add custom_image column
-- =============================================================================
-- image        = permanent default (set at seeding, never overwritten by admin)
-- custom_image = admin override (can be uploaded, replaced, or cleared)
--
-- Priority on frontend:  custom_image  ||  image  ||  local fallback
-- =============================================================================

ALTER TABLE homepage_sections
  ADD COLUMN IF NOT EXISTS custom_image TEXT;

COMMENT ON COLUMN homepage_sections.image IS
  'Permanent default image set at seeding. Never overwritten by admin uploads.';

COMMENT ON COLUMN homepage_sections.custom_image IS
  'Admin-uploaded override image. Takes priority over the default image column. Clear to restore the default.';
