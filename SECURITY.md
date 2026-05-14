# Security Documentation

## Japanese Machinery Premium Website

This document outlines all security measures implemented and required manual configurations for production deployment.

---

## Table of Contents

1. [Implemented Security Features](#implemented-security-features)
2. [Vercel Firewall Configuration](#vercel-firewall-configuration)
3. [Rate Limiting](#rate-limiting)
4. [Input Validation](#input-validation)
5. [Authentication & Authorization](#authentication--authorization)
6. [Database Security](#database-security)
7. [Security Headers](#security-headers)
8. [File Upload Security](#file-upload-security)
9. [Form Protection](#form-protection)
10. [Monitoring & Logging](#monitoring--logging)

---

## Implemented Security Features

### Code-Level Security

- **Input Validation**: All user inputs validated with Zod schemas
- **SQL Injection Protection**: Supabase client uses parameterized queries
- **XSS Prevention**: Rich text sanitized with `sanitize-html`
- **CSRF Protection**: Next.js Server Actions include built-in CSRF tokens
- **Rate Limiting**: Upstash Redis-based rate limiting on all endpoints
- **Secure Headers**: Configured via `next.config.mjs`
- **Environment Variables**: Server-only secrets never exposed to client

---

## Vercel Firewall Configuration

### Required Manual Steps in Vercel Dashboard

1. **Enable Vercel Firewall**
   - Go to Project Settings → Security → Firewall
   - Enable "Firewall" toggle

2. **Configure WAF Rules**
   ```
   Recommended Rules:
   - Block requests from known bad IPs
   - Block requests with suspicious user agents
   - Rate limit by IP address
   - Block requests from embargoed countries (if applicable)
   ```

3. **Enable Attack Challenge Mode** (if under attack)
   - Project Settings → Security → Attack Challenge Mode
   - Enable during active DDoS/brute force attacks

4. **Configure Bot Protection**
   ```
   Settings:
   - Enable "Bot Protection"
   - Set to "Managed Challenge" for suspicious requests
   - Whitelist legitimate bots (Googlebot, Bingbot, etc.)
   ```

5. **IP Blocking** (if needed)
   - Project Settings → Security → IP Blocking
   - Add specific IPs or CIDR ranges to block

6. **Country Blocking** (optional)
   - Configure if you only serve Spain/EU
   - Block high-risk countries not in your market

### Recommended Firewall Rules

```javascript
// Example custom rules (configure in Vercel Dashboard)

// Rule 1: Block known attack patterns
{
  name: "Block SQL Injection Attempts",
  match: {
    path: { contains: ["'", "\"", "UNION", "SELECT", "--"] }
  },
  action: "block"
}

// Rule 2: Rate limit contact form
{
  name: "Rate Limit Contact Form",
  match: {
    path: { equals: "/api/contact" }
  },
  rateLimit: {
    limit: 5,
    window: "1h"
  }
}

// Rule 3: Protect admin routes
{
  name: "Extra Protection for Admin",
  match: {
    path: { startsWith: "/admin" }
  },
  action: "challenge"  // Shows challenge for suspicious requests
}
```

---

## Rate Limiting

### Implemented Rate Limits

| Endpoint | Limit | Window | Purpose |
|----------|-------|--------|---------|
| General API | 60 | 1 minute | Prevent abuse |
| Contact Form | 5 | 1 hour | Prevent spam |
| Admin Actions | 100 | 1 minute | Allow admin work |
| Search | 30 | 1 minute | Prevent scraping |

### Configuration

Rate limiting is configured in `/lib/rate-limit.ts` using Upstash Redis.

```typescript
// Example usage in API route
import { checkRateLimit, apiRateLimiter, getClientIP } from '@/lib/rate-limit'

const ip = getClientIP(request)
const result = await checkRateLimit(apiRateLimiter, ip)

if (!result.success) {
  return new Response('Too Many Requests', { status: 429 })
}
```

---

## Input Validation

### All Forms Validated

- **Contact Form**: `/lib/validations.ts` → `contactFormSchema`
- **Product Form**: `/lib/validations.ts` → `productSchema`
- **Category Form**: `/lib/validations.ts` → `categorySchema`
- **Brand Form**: `/lib/validations.ts` → `brandSchema`
- **FAQ Form**: `/lib/validations.ts` → `faqSchema`

### Validation Rules Include

- Maximum string lengths
- Email format validation
- Phone number format validation
- URL validation
- Character whitelisting where appropriate
- Required field enforcement

---

## Authentication & Authorization

### Clerk Configuration

1. **Admin-Only Authentication**
   - Only `/admin/*` routes require authentication
   - Public pages have no authentication

2. **Middleware Protection**
   - `/middleware.ts` protects all `/admin/*` routes
   - Unauthorized users redirected to sign-in

3. **Role-Based Access Control**
   - `super_admin`: Full access including admin management
   - `admin`: Full content management
   - `editor`: Limited content editing

### Required Clerk Setup

1. Create a Clerk application at https://dashboard.clerk.com
2. Add environment variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
   CLERK_SECRET_KEY=sk_xxx
   ```
3. Configure allowed admin emails in `ALLOWED_ADMIN_EMAILS`

---

## Database Security

### Row Level Security (RLS)

All Supabase tables have RLS enabled with policies:

| Table | Public Read | Public Write | Admin Read | Admin Write |
|-------|-------------|--------------|------------|-------------|
| products | Published only | No | All | Yes |
| categories | Active only | No | All | Yes |
| brands | Active only | No | All | Yes |
| faq | Active only | No | All | Yes |
| contact_settings | Active only | No | All | Yes |
| social_links | Active only | No | All | Yes |
| admins | No | No | Super admin only | Super admin only |
| contact_submissions | No | Yes (insert only) | Yes | Yes |

### Service Role Key

- **NEVER expose `SUPABASE_SERVICE_ROLE_KEY` to client**
- Only use in server-side code (API routes, Server Actions)
- Service role bypasses RLS - use with caution

---

## Security Headers

### Configured in next.config.mjs

```javascript
headers: [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; ..."
  }
]
```

---

## File Upload Security

### Implemented Restrictions

- **Allowed file types**: JPEG, PNG, WebP only
- **Maximum file size**: 10MB for products, 5MB for logos
- **Server-side validation**: File type verified by content, not extension
- **Storage**: Supabase Storage with bucket-level restrictions

### Storage Bucket Policies

Each bucket has:
- Public read access (for displaying images)
- Admin-only write/update/delete access
- File type restrictions at bucket level

---

## Form Protection

### Contact Form

1. **Rate Limiting**: 5 submissions per hour per IP
2. **GDPR Consent**: Required checkbox
3. **Honeypot Field**: Hidden field to catch bots
4. **Server Validation**: All fields re-validated server-side

### Bot Protection Recommendations

Enable in Vercel Dashboard:
- Managed Challenge for forms
- reCAPTCHA or hCaptcha integration (optional)
- JavaScript challenge for suspicious requests

---

## Monitoring & Logging

### Recommended Setup

1. **Vercel Analytics**
   - Enable in Project Settings
   - Monitor traffic patterns

2. **Error Tracking**
   - Consider Sentry integration
   - Log security-relevant events

3. **Audit Logging** (custom implementation)
   ```typescript
   // Log admin actions
   await logAdminAction({
     admin_id: user.id,
     action: 'product_created',
     target_id: product.id,
     ip_address: clientIP,
     timestamp: new Date()
   })
   ```

4. **Alert Configuration**
   - Set up alerts for:
     - Unusual traffic spikes
     - Multiple failed login attempts
     - Rate limit triggers
     - Error rate increases

---

## Security Checklist for Production

- [ ] Vercel Firewall enabled
- [ ] WAF rules configured
- [ ] Bot protection enabled
- [ ] Rate limiting tested
- [ ] RLS policies verified
- [ ] Storage policies verified
- [ ] Environment variables secured
- [ ] Admin access restricted
- [ ] HTTPS enforced
- [ ] Security headers verified
- [ ] Error messages don't leak information
- [ ] Logging configured
- [ ] Backup strategy in place

---

## Incident Response

### If Under Attack

1. **Enable Attack Challenge Mode** in Vercel Dashboard
2. **Review logs** for attack patterns
3. **Add IP blocks** for malicious IPs
4. **Increase rate limits** if legitimate users affected
5. **Contact Vercel support** for severe attacks

### If Data Breach Suspected

1. **Rotate all secrets** immediately
2. **Review audit logs**
3. **Notify affected users** per GDPR requirements
4. **Document incident** for compliance
5. **Review and patch** vulnerability

---

## Questions?

For security concerns, contact the development team or Vercel support.
