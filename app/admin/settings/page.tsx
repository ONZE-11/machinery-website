"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Mail, Phone, MapPin, Clock, Loader2, CheckCircle2 } from "lucide-react"
import type { ContactSettings } from "@/types/database"

const KNOWN_KEYS = [
  "email", "phone", "whatsapp",
  "address", "city", "postal_code", "country",
  "hours",
]

const LABELS: Record<string, string> = {
  email: "Email",
  phone: "Phone",
  whatsapp: "WhatsApp",
  address: "Street Address",
  city: "City",
  postal_code: "Postal Code",
  country: "Country",
  hours: "Business Hours",
}

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const loadSettings = useCallback(async () => {
    const res = await fetch("/api/settings")
    if (!res.ok) return
    const rows: ContactSettings[] = await res.json()
    const map: Record<string, string> = {}
    rows.forEach((r) => { map[r.setting_key] = r.value })
    setValues(map)
    setLoading(false)
  }, [])

  useEffect(() => { loadSettings() }, [loadSettings])

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const body = KNOWN_KEYS.map((key) => ({
      setting_key: key,
      value: values[key] ?? "",
      label: LABELS[key],
    }))
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    setSaving(false)
    if (res.ok) setSaved(true)
  }

  const supabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage site settings and contact information</p>
        </div>
        <Button onClick={handleSave} disabled={saving || loading} className="gap-2">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>Update your business contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["email", "phone", "whatsapp"].map((key) => (
                <div key={key}>
                  <Label htmlFor={key}>{LABELS[key]}</Label>
                  <Input
                    id={key}
                    type={key === "email" ? "email" : "text"}
                    value={values[key] ?? ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="mt-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address
              </CardTitle>
              <CardDescription>Business address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">{LABELS.address}</Label>
                <Input
                  id="address"
                  value={values.address ?? ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["city", "postal_code"].map((key) => (
                  <div key={key}>
                    <Label htmlFor={key}>{LABELS[key]}</Label>
                    <Input
                      id={key}
                      value={values[key] ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="country">{LABELS.country}</Label>
                <Input
                  id="country"
                  value={values.country ?? ""}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Business Hours
              </CardTitle>
              <CardDescription>When customers can reach you</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="hours">{LABELS.hours}</Label>
              <Textarea
                id="hours"
                value={values.hours ?? ""}
                onChange={(e) => handleChange("hours", e.target.value)}
                className="mt-2"
                rows={4}
                placeholder={"Lunes a Viernes: 9:00 - 18:00\nSábados: 9:00 - 14:00"}
              />
            </CardContent>
          </Card>

          {/* Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>Connected services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Supabase", sub: "Database & Storage", ok: supabaseConfigured },
                { label: "Clerk", sub: "Admin Authentication", ok: clerkConfigured },
              ].map(({ label, sub, ok }) => (
                <div key={label} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-muted-foreground">{sub}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      ok
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {ok ? "Connected" : "Not Connected"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
