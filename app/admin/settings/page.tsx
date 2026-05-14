"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { mockContactSettings } from "@/lib/mock-data"
import { Save, Mail, Phone, MapPin, Clock } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage site settings and contact information
          </p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>
              Update your business contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={mockContactSettings.email}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                defaultValue={mockContactSettings.phone}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                defaultValue={mockContactSettings.whatsapp || ""}
                className="mt-2"
              />
            </div>
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
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                defaultValue={mockContactSettings.address}
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  defaultValue={mockContactSettings.city}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  defaultValue={mockContactSettings.postal_code}
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                defaultValue={mockContactSettings.country}
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
            <div>
              <Label htmlFor="hours">Business Hours</Label>
              <Textarea
                id="hours"
                defaultValue={mockContactSettings.business_hours}
                className="mt-2"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Integration Status */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>
              Connected services and environment status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Supabase</p>
                <p className="text-sm text-muted-foreground">Database & Auth</p>
              </div>
              <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-400 rounded">
                Not Connected
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Clerk</p>
                <p className="text-sm text-muted-foreground">Admin Authentication</p>
              </div>
              <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-400 rounded">
                Not Connected
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Upstash Redis</p>
                <p className="text-sm text-muted-foreground">Rate Limiting</p>
              </div>
              <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-400 rounded">
                Not Connected
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Add environment variables in the .env file to connect these
              services.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
