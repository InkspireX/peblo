"use client"

import { Card } from "@/components/ui/card"
import { SafetyFlags } from "@/components/dashboard/safety-flags"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { TopFilters } from "@/components/dashboard/top-filters"
import { useFilters } from "@/components/filters-provider"

export default function Page() {
  const { filters } = useFilters()
  const f = filters.range === "7d" ? 1 : filters.range === "14d" ? 1.05 : 1.1
  const items = [
    { at: "Aug 2, 1:05 PM", type: "External link", severity: "medium" as const, note: "Asked about a YouTube link" },
    { at: "Jul 31, 9:12 AM", type: "Private info", severity: "low" as const, note: "Mentioned home address" },
  ]
  const metrics = [
    { label: "Flags this week", value: String(Math.max(1, Math.round(1 * f))) },
    { label: "Resolved", value: `${Math.min(100, Math.round(100 * (1 / f)))}%` },
    { label: "Trend", value: "Stable" },
  ]
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold">Safety flags</h1>
      <div className="mt-4">
        <TopFilters />
      </div>
      <div className="mt-4">
        <MetricCards items={metrics} />
      </div>
      <div className="mt-4">
        <SafetyFlags items={items} />
      </div>
      <Card className="p-4 mt-4">
        <h3 className="font-medium">Safety guidance</h3>
        <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
          <li>When external links are mentioned, discuss safe browsing together.</li>
          <li>For private info, remind kids: names, addresses, and numbers stay private.</li>
          <li>Enable content filters under Settings to reduce risky topics.</li>
        </ul>
      </Card>
    </main>
  )
}


