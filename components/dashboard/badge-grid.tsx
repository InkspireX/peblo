"use client"

import * as React from "react"

type BadgeItem = { title: string; earned: boolean; date?: string }

export function BadgeGrid({ items }: { items: BadgeItem[] }) {
  return (
    <div className="grid h-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 content-start auto-rows-[minmax(0,1fr)]">
      {items.map((b, i) => (
        <div key={i} className="relative rounded-2xl p-5 border glass text-center shiny h-full flex flex-col justify-center">
          <div className="mx-auto h-20 w-20 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
               style={{ background: b.earned ? "conic-gradient(from 180deg,var(--chart-4),var(--chart-2),var(--chart-3),var(--chart-4))" : "var(--muted)", color: "var(--primary-foreground)" }}>
            <span className="text-2xl font-semibold drop-shadow">{b.title.split(" ")[0].slice(0,1)}</span>
          </div>
          <div className="mt-2 text-sm font-medium">{b.title}</div>
          <div className="text-xs text-muted-foreground">{b.earned ? (b.date || "Unlocked") : "Locked"}</div>
          {b.earned && (
            <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs shadow"
                 style={{ background: "oklch(0.88 0.15 80)", color: "var(--accent-foreground)" }}>New</div>
          )}
        </div>
      ))}
    </div>
  )
}


