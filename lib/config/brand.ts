// =============================================================================
// BRAND CONFIG — Single source of truth for brand identity and domain.
// Change domain, name, or emails here and they propagate everywhere.
// =============================================================================

export const brand = {
  /** Public-facing display name used in UI, copyright, and aria labels */
  name: 'Maquinaria Japonesa',

  /** Legal entity name for official documents */
  legalName: 'Maquinaria Japonesa S.L.',

  /** Domain without protocol — used for email construction and display */
  domain: 'maquinariajapones.es',

  /** Canonical site URL. Override at runtime via NEXT_PUBLIC_SITE_URL env var. */
  siteUrl: 'https://maquinariajapones.es',

  emails: {
    info:    'info@maquinariajapones.es',
    privacy: 'privacidad@maquinariajapones.es',
    legal:   'legal@maquinariajapones.es',
    admin:   'admin@maquinariajapones.es',
  },

  seo: {
    titleDefault:        'Maquinaria Japonesa | Mini Excavadoras y Tractores en España',
    titleTemplate:       '%s | Maquinaria Japonesa',
    description:         'Especialistas en maquinaria japonesa de segunda mano en España. Mini excavadoras Kubota, tractores Yanmar, equipos Komatsu importados directamente de Japón con garantía.',
    siteName:            'Maquinaria Japonesa',
    locale:              'es_ES',
    ogImageAlt:          'Maquinaria Japonesa — Mini excavadoras y tractores japoneses en España',
    twitterTitle:        'Maquinaria Japonesa | España',
    twitterDescription:  'Especialistas en maquinaria japonesa de segunda mano. Kubota, Yanmar, Komatsu importados de Japón.',
  },
} as const

export type Brand = typeof brand
