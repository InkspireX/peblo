"use client"

import { Card } from "@/components/ui/card"
import { TopTopicsBar } from "@/components/dashboard/top-topics-bar"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { TopFilters } from "@/components/dashboard/top-filters"
import { useFilters } from "@/components/filters-provider"

export default function Page() {
  const { filters } = useFilters()
  const f = filters.range === "7d" ? 1 : filters.range === "14d" ? 1.1 : 1.2
  const data = [
    { topic: "Space", count: Math.round(32 * f) },
    { topic: "Animals", count: Math.round(28 * f) },
    { topic: "Math", count: Math.round(21 * f) },
    { topic: "Stories", count: Math.round(18 * f) },
    { topic: "Games", count: Math.round(14 * f) },
  ]
  const metrics = [
    { label: "New topics this week", value: String(Math.round(7 * f)), delta: "+2" },
    { label: "Most loved category", value: "Space" },
    { label: "Diversity score", value: String(Math.round(82 * (f / 1.05))), delta: "+6" },
  ]
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold">Topics explored</h1>
      <div className="mt-4">
        <TopFilters />
      </div>
      <div className="mt-4">
        <MetricCards items={metrics} />
      </div>
      <Card className="p-4 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Top topics</h3>
          <span className="text-sm text-muted-foreground">By count</span>
        </div>
        <div className="h-64 mt-2">
          <TopTopicsBar data={data} />
        </div>
      </Card>
      <Card className="p-4 mt-4">
        <h3 className="font-medium">Suggestions for variety</h3>
        <p className="text-sm text-muted-foreground mt-2">Add new prompts to broaden interests:</p>
        <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
          <li>Ask about “music from different countries.”</li>
          <li>Explore “weather patterns and seasons.”</li>
          <li>Try “inventions that changed the world.”</li>
        </ul>
      </Card>
    </main>
  )
}


