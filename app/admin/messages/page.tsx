"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ContactSubmission } from "@/types/database"
import { Mail, Eye, EyeOff, Reply, Trash2, Loader2 } from "lucide-react"

function deriveStatus(msg: ContactSubmission): { label: string; className: string } {
  if (msg.replied) return { label: "Replied", className: "bg-emerald-500/20 text-emerald-400" }
  if (msg.read) return { label: "Read", className: "bg-muted text-muted-foreground" }
  return { label: "New", className: "bg-blue-500/20 text-blue-400" }
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data)
        else setError("Failed to load messages")
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false))
  }, [])

  const patch = async (id: string, body: Partial<Pick<ContactSubmission, "read" | "replied">>) => {
    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...body } : m)))
    }
  }

  const handleDelete = async (msg: ContactSubmission) => {
    if (!window.confirm(`¿Eliminar el mensaje de ${msg.name}?`)) return
    const res = await fetch(`/api/messages/${msg.id}`, { method: "DELETE" })
    if (res.ok) setMessages((prev) => prev.filter((m) => m.id !== msg.id))
  }

  const newCount = messages.filter((m) => !m.read && !m.replied).length
  const repliedCount = messages.filter((m) => m.replied).length
  const readCount = messages.filter((m) => m.read && !m.replied).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">Contact form submissions and inquiries</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Mail, color: "blue", count: newCount, label: "New Messages" },
          { icon: Reply, color: "emerald", count: repliedCount, label: "Replied" },
          { icon: Eye, color: "muted", count: readCount, label: "Read" },
        ].map(({ icon: Icon, color, count, label }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-${color}-500/10 flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${color}-500`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {error && <p className="text-red-500 text-sm text-center py-8">{error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          {messages.map((message) => {
            const status = deriveStatus(message)
            return (
              <Card
                key={message.id}
                className={cn(!message.read && !message.replied && "border-primary/40")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-semibold text-foreground">{message.name}</h3>
                        <Badge className={status.className}>{status.label}</Badge>
                        {!message.read && !message.replied && (
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{message.email}</p>
                      {message.phone && (
                        <p className="text-sm text-muted-foreground mb-1">{message.phone}</p>
                      )}
                      {message.company && (
                        <p className="text-sm text-muted-foreground mb-1">{message.company}</p>
                      )}
                      {message.product_interest && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Product: {message.product_interest}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm line-clamp-2">{message.message}</p>
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(message.created_at).toLocaleDateString("es-ES", {
                          day: "numeric", month: "long", year: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        title={message.read ? "Mark unread" : "Mark read"}
                        onClick={() => patch(message.id, { read: !message.read })}
                      >
                        {message.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title={message.replied ? "Mark not replied" : "Mark replied"}
                        onClick={() => patch(message.id, { replied: !message.replied, read: true })}
                      >
                        <Reply className={cn("h-4 w-4", message.replied && "text-emerald-400")} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(message)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {messages.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No messages yet</p>
          )}
        </div>
      )}
    </div>
  )
}
