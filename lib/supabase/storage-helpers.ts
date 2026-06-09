/**
 * Converts any stored image value to a renderable URL.
 *
 * Stored values can be:
 *   • A full Supabase public URL  → https://abc.supabase.co/storage/v1/object/public/products/img.jpg
 *   • A raw storage path          → 1234567890-abcd.jpg   (no bucket prefix, stored before url fix)
 *   • A bucket-prefixed path      → products/img.jpg
 *   • A local public path         → /images/placeholder-machinery.jpg
 *   • null / undefined / ""       → fallback placeholder
 *
 * Returns a string that is always safe to pass to <Image src={}>.
 */
export function normalizeImageUrl(
  value: string | null | undefined,
  bucket: "products" | "brands" | "categories" | "homepage" = "products"
): string {
  const PLACEHOLDER = "/images/placeholder-machinery.jpg"

  if (!value || value.trim() === "") return PLACEHOLDER

  // Already a full URL (http or https)
  if (value.startsWith("http://") || value.startsWith("https://")) return value

  // Local public path
  if (value.startsWith("/")) return value

  // Raw storage path — construct the public URL.
  // The NEXT_PUBLIC_SUPABASE_URL env var is available both server-side and
  // in client bundles (it's prefixed NEXT_PUBLIC_).
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return PLACEHOLDER

  // If the path already includes the bucket name as prefix, use it directly.
  // e.g. "products/img.jpg" → don't double-prefix
  const hasPrefix = value.startsWith(`${bucket}/`)
  const storagePath = hasPrefix ? value : `${bucket}/${value}`

  return `${supabaseUrl}/storage/v1/object/public/${storagePath}`
}
