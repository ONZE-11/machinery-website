"use client"

import { useRef, useState } from "react"
import { X, Upload, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type UploadBucket = "products" | "brands" | "categories" | "homepage"

// Per-bucket limits mirror the SQL bucket definitions
const MAX_BYTES: Record<UploadBucket, number> = {
  products: 10 * 1024 * 1024,
  homepage: 10 * 1024 * 1024,
  brands: 5 * 1024 * 1024,
  categories: 5 * 1024 * 1024,
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const

interface ImageUploaderProps {
  bucket?: UploadBucket
  /** Current image URL — when provided, shows preview instead of upload area */
  value?: string
  onUpload: (url: string) => void
  onRemove: () => void
  /** Short label shown inside the empty upload area */
  label?: string
  className?: string
  /** Square (default) or rectangular aspect ratio for the upload zone */
  aspect?: "square" | "video"
}

export function ImageUploader({
  bucket = "products",
  value,
  onUpload,
  onRemove,
  label,
  className,
  aspect = "square",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setError(null)

    // ── Client-side validation (prevents unnecessary round-trips) ───────────
    if (!(ALLOWED_TYPES as readonly string[]).includes(file.type)) {
      setError("Solo se permiten imágenes JPG, PNG o WebP")
      return
    }
    if (file.size > MAX_BYTES[bucket]) {
      const mb = MAX_BYTES[bucket] / (1024 * 1024)
      setError(`La imagen no puede superar ${mb} MB`)
      return
    }

    // ── Upload via secure server route ───────────────────────────────────────
    setUploading(true)
    try {
      const body = new FormData()
      body.append("file", file)
      body.append("bucket", bucket)

      const res = await fetch("/api/upload", { method: "POST", body })
      const json: { url?: string; error?: string } = await res.json()

      if (!res.ok || !json.url) {
        setError(json.error ?? "Upload failed — please try again")
        return
      }

      onUpload(json.url)
    } catch {
      setError("Network error — please try again")
    } finally {
      setUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // Reset input so the same file can be re-selected after removal
    e.target.value = ""
  }

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const aspectClass = aspect === "video" ? "aspect-video" : "aspect-square"

  return (
    <div className={cn("space-y-1.5", className)}>
      {value ? (
        // ── Preview ───────────────────────────────────────────────────────────
        <div
          className={cn(
            "relative rounded-lg overflow-hidden bg-muted group",
            aspectClass
          )}
        >
          <img
            src={value}
            alt={label ?? "Uploaded image"}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove image"
            className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        // ── Upload zone ───────────────────────────────────────────────────────
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={cn(
            "w-full rounded-lg border-2 border-dashed border-border transition-colors",
            "flex flex-col items-center justify-center gap-2",
            aspectClass,
            uploading
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:border-primary/60 hover:bg-muted/40"
          )}
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
          ) : (
            <>
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground text-center leading-tight px-3">
                {label ?? "Click or drag image here"}
              </span>
              <span className="text-[10px] text-muted-foreground/60">
                JPG, PNG, WebP
              </span>
            </>
          )}
        </button>
      )}

      {/* Hidden native file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />

      {error && (
        <p className="text-red-500 text-xs leading-tight">{error}</p>
      )}
    </div>
  )
}
