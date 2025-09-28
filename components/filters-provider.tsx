"use client"

import React from "react"

export type FiltersState = {
  range: "7d" | "14d" | "30d"
  child: string
  device: string
}

type FiltersContextValue = {
  filters: FiltersState
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
}

const FiltersContext = React.createContext<FiltersContextValue | null>(null)

const initialFilters: FiltersState = { range: "7d", child: "Alex", device: "All devices" }

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = React.useState<FiltersState>(initialFilters)
  const value = React.useMemo(() => ({ filters, setFilters }), [filters])
  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}

export function useFilters() {
  const ctx = React.useContext(FiltersContext)
  if (!ctx) throw new Error("useFilters must be used within FiltersProvider")
  return ctx
}


