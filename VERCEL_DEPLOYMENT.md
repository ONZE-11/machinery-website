# Vercel Deployment Guide

## Japanese Machinery Premium Website

Complete guide for deploying to Vercel with all security and performance configurations.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Deployment](#initial-deployment)
3. [Environment Variables](#environment-variables)
4. [Domain Configuration](#domain-configuration)
5. [Security Settings](#security-settings)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring Setup](#monitoring-setup)
8. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub repository with the project code
- [ ] Supabase project created and configured (see `SUPABASE_SETUP.md`)
- [ ] Clerk application created (https://dashboard.clerk.com)
- [ ] Upstash Redis database created (https://console.upstash.com)
- [ ] Domain name ready (e.g., `maquinariajaponesa.es`)

---

## Initial Deployment

### Option 1: Deploy from GitHub

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `pnpm build` (auto-detected)
   - **Output Directory**: `.next` (default)
5. Add environment variables (see next section)
6. Click "Deploy"

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

---

## Environment Variables

### Required Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/admin/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin
ALLOWED_ADMIN_EMAILS=admin@maquinariajaponesa.es

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://maquinariajaponesa.es
NEXT_PUBLIC_SITE_NAME=Maquinaria Japonesa Premium

# Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=34601080799
NEXT_PUBLIC_PHONE_NUMBER=+34 601 080 799
NEXT_PUBLIC_EMAIL=info@maquinariajaponesa.es

# Social
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/maquinariajaponesa
NEXT_PUBLIC_TIKTOK_URL=https://tiktok.com/@maquinariajaponesa
```

### Environment Scopes

Set each variable for appropriate environments:

| Variable | Production | Preview | Development |
|----------|------------|---------|-------------|
| `NEXT_PUBLIC_*` | Yes | Yes | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Yes | No* |
| `CLERK_SECRET_KEY` | Yes | Yes | No* |
| `UPSTASH_*` | Yes | Yes | Optional |

*Use local `.env.local` for development secrets

---

## Domain Configuration

### Add Custom Domain

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain: `maquinariajaponesa.es`
4. Add `www.maquinariajaponesa.es` as well

### DNS Configuration

Add these DNS records at your domain registrar:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### SSL/HTTPS

- Vercel automatically provisions SSL certificates
- HTTPS is enforced by default
- No additional configuration needed

### Redirect Configuration

Configure in `vercel.json` or Project Settings → Domains:

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.maquinariajaponesa.es" }],
      "destination": "https://maquinariajaponesa.es/:path*",
      "permanent": true
    }
  ]
}
```

---

## Security Settings

### Enable Vercel Firewall

1. Go to Project Settings → Security
2. Enable "Firewall"
3. Configure rules (see `SECURITY.md` for details)

### Recommended Firewall Rules

```
1. Rate limit API routes: 60 requests/minute
2. Rate limit contact form: 5 requests/hour
3. Challenge suspicious requests to /admin/*
4. Block known malicious IPs
5. Block requests with attack patterns
```

### Enable Bot Protection

1. Project Settings → Security → Bot Protection
2. Set to "Managed Challenge"
3. Whitelist legitimate bots in settings

### Attack Challenge Mode

- Keep disabled by default
- Enable only during active attacks
- Project Settings → Security → Attack Challenge Mode

---

## Performance Optimization

### Enable Vercel Analytics

1. Project Settings → Analytics
2. Click "Enable"
3. Web Analytics and Speed Insights will be active

### Configure Caching

Already configured in `next.config.mjs`:

- Static assets: 1 year cache
- Images: Optimized via Next.js Image component
- Pages: ISR where applicable

### Image Optimization

Verify in next.config.mjs:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.supabase.co',
    }
  ],
  formats: ['image/avif', 'image/webp'],
}
```

### Edge Functions

The middleware runs on Vercel Edge for:
- Fast authentication checks
- Rate limiting at edge
- Geo-based routing (if needed)

---

## Monitoring Setup

### Vercel Dashboard Monitoring

- **Deployments**: Track all deployments
- **Functions**: Monitor serverless function performance
- **Analytics**: User traffic and Core Web Vitals

### Set Up Alerts

1. Go to Project Settings → Notifications
2. Configure alerts for:
   - Deployment failures
   - Function errors
   - Domain issues

### Recommended Third-Party Monitoring

1. **Sentry** (Error Tracking)
   - Add `SENTRY_DSN` environment variable
   - Captures JavaScript errors

2. **UptimeRobot** (Uptime Monitoring)
   - Monitor https://maquinariajaponesa.es
   - Get alerts for downtime

---

## Post-Deployment Checklist

### Immediate Checks

- [ ] Site loads at production URL
- [ ] HTTPS is working
- [ ] All pages render correctly
- [ ] Images load properly
- [ ] Contact form submits
- [ ] Admin dashboard accessible

### SEO Verification

- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` accessible
- [ ] Meta tags render correctly
- [ ] Open Graph images work
- [ ] JSON-LD structured data present

### Security Verification

- [ ] Firewall enabled
- [ ] Bot protection active
- [ ] Rate limiting working
- [ ] Admin routes protected
- [ ] Environment variables secure

### Performance Verification

- [ ] Run Lighthouse audit (target 90+)
- [ ] Check Core Web Vitals
- [ ] Verify image optimization
- [ ] Test mobile performance

### Final Steps

1. **Submit to Google Search Console**
   - Add property for `maquinariajaponesa.es`
   - Submit sitemap
   - Request indexing

2. **Test Contact Methods**
   - WhatsApp link works
   - Phone number clickable
   - Email form delivers

3. **Set Up Backups**
   - Supabase automatic backups (Pro plan)
   - Git repository backed up

---

## Troubleshooting

### Build Failures

```bash
# Check build logs in Vercel Dashboard
# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Module not found

# Local debug:
pnpm build
```

### 500 Errors

- Check Function Logs in Vercel Dashboard
- Verify environment variables are set
- Check Supabase connection

### Slow Performance

- Enable Vercel Analytics
- Check function cold starts
- Review database query performance
- Optimize images

### Domain Issues

- Verify DNS propagation (use dnschecker.org)
- Check SSL certificate status
- Ensure correct DNS records

---

## Rollback Procedure

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." menu → "Promote to Production"
4. The previous version will be live immediately

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/next.js/discussions
- **Status Page**: https://www.vercel-status.com
