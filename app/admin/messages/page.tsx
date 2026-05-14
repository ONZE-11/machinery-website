"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Eye, Archive, Reply, Trash2 } from "lucide-react"

// Mock messages data
const mockMessages = [
  {
    id: "1",
    name: "Carlos García",
    email: "carlos@empresa.es",
    subject: "Consulta sobre excavadora Komatsu",
    message: "Estoy interesado en la excavadora Komatsu PC200-8. ¿Podría enviarme más información?",
    product_interest: "komatsu-pc200-8-excavator",
    created_at: "2024-01-15T10:30:00Z",
    is_read: false,
    status: "new",
  },
  {
    id: "2",
    name: "María López",
    email: "maria@construcciones.es",
    subject: "Solicitud de presupuesto",
    message: "Necesito un presupuesto para 3 carretillas Toyota. Gracias.",
    product_interest: null,
    created_at: "2024-01-14T15:45:00Z",
    is_read: true,
    status: "replied",
  },
  {
    id: "3",
    name: "Pedro Martínez",
    email: "pedro@logistica.com",
    subject: "Información sobre financiación",
    message: "¿Ofrecen opciones de financiación para la compra de maquinaria?",
    product_interest: null,
    created_at: "2024-01-13T09:15:00Z",
    is_read: true,
    status: "archived",
  },
]

export default function MessagesPage() {
  const statusColors: Record<string, string> = {
    new: "bg-blue-500/20 text-blue-400",
    replied: "bg-emerald-500/20 text-emerald-400",
    archived: "bg-muted text-muted-foreground",
  }

  const statusLabels: Record<string, string> = {
    new: "New",
    replied: "Replied",
    archived: "Archived",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">
            Contact form submissions and inquiries
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Archive className="h-4 w-4" />
            Archive All Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockMessages.filter((m) => m.status === "new").length}
                </p>
                <p className="text-sm text-muted-foreground">New Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Reply className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockMessages.filter((m) => m.status === "replied").length}
                </p>
                <p className="text-sm text-muted-foreground">Replied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Archive className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockMessages.filter((m) => m.status === "archived").length}
                </p>
                <p className="text-sm text-muted-foreground">Archived</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockMessages.map((message) => (
          <Card
            key={message.id}
            className={message.is_read ? "" : "border-primary/50"}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {message.name}
                    </h3>
                    <Badge className={statusColors[message.status]}>
                      {statusLabels[message.status]}
                    </Badge>
                    {!message.is_read && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {message.email}
                  </p>
                  <p className="font-medium mb-2">{message.subject}</p>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {message.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(message.created_at).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Reply className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
