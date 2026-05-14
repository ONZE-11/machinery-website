import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// =============================================================================
// UPSTASH REDIS RATE LIMITING
// =============================================================================
// Rate limiting configuration for API routes and Server Actions
// Uses a sliding window algorithm for smooth rate limiting
// =============================================================================

// Check if Upstash is configured
const isUpstashConfigured = 
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN

// Create Redis client if configured
const redis = isUpstashConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

// =============================================================================
// RATE LIMITERS
// =============================================================================

// General API rate limiter: 60 requests per minute
export const apiRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, '1 m'),
      analytics: true,
      prefix: 'ratelimit:api',
    })
  : null

// Contact form rate limiter: 5 requests per hour per IP
export const contactFormRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      analytics: true,
      prefix: 'ratelimit:contact',
    })
  : null

// Admin action rate limiter: 100 requests per minute
export const adminRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true,
      prefix: 'ratelimit:admin',
    })
  : null

// Search rate limiter: 30 requests per minute
export const searchRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, '1 m'),
      analytics: true,
      prefix: 'ratelimit:search',
    })
  : null

// =============================================================================
// RATE LIMIT HELPER
// =============================================================================

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<RateLimitResult> {
  // If rate limiter is not configured, allow all requests (development mode)
  if (!limiter) {
    return {
      success: true,
      limit: 999,
      remaining: 999,
      reset: Date.now() + 60000,
    }
  }

  try {
    const result = await limiter.limit(identifier)
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    }
  } catch (error) {
    console.error('[RateLimit] Error checking rate limit:', error)
    // Fail open in case of errors to not block legitimate users
    return {
      success: true,
      limit: 999,
      remaining: 999,
      reset: Date.now() + 60000,
    }
  }
}

// =============================================================================
// IP EXTRACTION HELPER
// =============================================================================

export function getClientIP(request: Request): string {
  // Check various headers for client IP
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback for development
  return '127.0.0.1'
}

// =============================================================================
// RATE LIMIT RESPONSE HEADERS
// =============================================================================

export function getRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  }
}
