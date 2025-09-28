"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  { label: "Overview", href: "/" },
  { label: "Curiosity", href: "/curiosity" },
  { label: "Topics explored", href: "/topics" },
  { label: "Conversation time", href: "/conversation-time" },
  { label: "Sleep & wake", href: "/sleep-wake" },
  { label: "Safety flags", href: "/safety-flags" },
  { label: "Achievements", href: "/achievements" },
  { label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:block w-64 shrink-0 p-3">
      <nav className="rounded-lg border bg-card glass">
        <div className="px-3 py-3 border-b">
          <span className="text-sm font-medium">Analytics</span>
        </div>
        <ul className="p-2">
          {items.map((item, idx) => {
            const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
            return (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm text-foreground/90 hover:bg-accent",
                    isActive && "bg-primary/10 text-foreground border border-primary/20"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="mt-3 rounded-lg border bg-card p-3">
        <p className="text-sm">Trial ends in 7 days</p>
        <div className="mt-2 flex gap-2">
          <button className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground">Buy now</button>
          <button className="px-3 py-1.5 text-sm rounded-md border">Help</button>
        </div>
      </div>
    </aside>
  )
}
