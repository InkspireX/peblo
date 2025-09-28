"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type DrillContent = { title: string; body: React.ReactNode } | null

type Ctx = {
  openDrilldown: (title: string, body: React.ReactNode) => void
}

const DrilldownContext = React.createContext<Ctx | null>(null)

export function DrilldownProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<DrillContent>(null)
  const openDrilldown = React.useCallback((title: string, body: React.ReactNode) => setContent({ title, body }), [])
  const onOpenChange = (open: boolean) => {
    if (!open) setContent(null)
  }
  return (
    <DrilldownContext.Provider value={{ openDrilldown }}>
      {children}
      <Dialog open={!!content} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{content?.title}</DialogTitle>
          </DialogHeader>
          <div className="text-sm">{content?.body}</div>
        </DialogContent>
      </Dialog>
    </DrilldownContext.Provider>
  )
}

export function useDrilldown() {
  const ctx = React.useContext(DrilldownContext)
  if (!ctx) throw new Error("useDrilldown must be used within DrilldownProvider")
  return ctx
}


