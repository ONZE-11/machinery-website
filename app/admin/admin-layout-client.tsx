"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Factory,
  FileQuestion,
  Mail,
  Settings,
  Menu,
  LogOut,
  Home,
  Users,
  Globe,
  Image as ImageIcon,
} from "lucide-react"

// Mock auth state - replace with Clerk when connected
const mockUser = {
  name: "Admin User",
  email: "admin@maquinariajapones.es",
  role: "admin",
}

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Brands",
    href: "/admin/brands",
    icon: Factory,
  },
  {
    title: "FAQ",
    href: "/admin/faq",
    icon: FileQuestion,
  },
  {
    title: "Contact Messages",
    href: "/admin/messages",
    icon: Mail,
  },
  {
    title: "Homepage",
    href: "/admin/homepage",
    icon: Home,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: ImageIcon,
  },
  {
    title: "Social Links",
    href: "/admin/social",
    icon: Globe,
  },
  {
    title: "Admins",
    href: "/admin/admins",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">M</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">Maquinaria JP</p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || 
              (link.href !== "/admin" && pathname.startsWith(link.href))
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.title}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium">
              {mockUser.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {mockUser.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {mockUser.email}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="flex-1">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Home className="h-4 w-4" />
              View Site
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="gap-2">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock auth check - replace with Clerk when connected
  const isAuthenticated = true // In production: useAuth().isSignedIn

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            Please sign in to access the admin dashboard.
          </p>
          <Button>Sign In</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border hidden lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border lg:hidden">
        <div className="flex items-center justify-between p-4">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">M</span>
            </div>
            <span className="font-semibold">Admin</span>
          </Link>

          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
