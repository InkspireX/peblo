"use client"

import { Card } from "@/components/ui/card"
import { useFilters } from "@/components/filters-provider"

export function TopFilters() {
  const { filters, setFilters } = useFilters()
  return (
    <Card className="p-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm">Range</label>
          <select
            className="rounded-md border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={filters.range}
            onChange={(e) =>
              setFilters((f) => ({ ...f, range: e.target.value as any }))
            }
          >
            <option value="7d">Last 7 days</option>
            <option value="14d">Last 14 days</option>
            <option value="30d">Last 30 days</option>
          </select>

          <label className="text-sm">Child</label>
          <select
            className="rounded-md border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-chart-3"
            value={filters.child}
            onChange={(e) => setFilters((f) => ({ ...f, child: e.target.value }))}
          >
            <option value="Alex">Alex</option>
            <option value="Maya">Maya</option>
          </select>

          <label className="text-sm">Device</label>
          <select
            className="rounded-md border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-chart-4"
            value={filters.device}
            onChange={(e) => setFilters((f) => ({ ...f, device: e.target.value }))}
          >
            <option value="All devices">All devices</option>
            <option value="Bedroom Toy">Bedroom Toy</option>
            <option value="Travel Toy">Travel Toy</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-md border px-3 py-1.5 text-sm bg-primary text-primary-foreground">Compare</button>
          <button className="rounded-md border px-3 py-1.5 text-sm bg-secondary text-secondary-foreground">More filters</button>
        </div>
      </div>
    </Card>
  )
}
