"use client"

import { Card } from "@/components/ui/card"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { EngagementLineChart } from "@/components/dashboard/workload-line-chart"
import { BusiestHeatmap } from "@/components/dashboard/busiest-heatmap"
import { TopFilters } from "@/components/dashboard/top-filters"
import { useFilters } from "@/components/filters-provider"

export default function Page() {
  const { filters } = useFilters()
  const f = filters.range === "7d" ? 1 : filters.range === "14d" ? 1.15 : 1.3
  const baseWeek = [
    { day: "Mon", value: 18 },
    { day: "Tue", value: 24 },
    { day: "Wed", value: 21 },
    { day: "Thu", value: 34 },
    { day: "Fri", value: 27 },
    { day: "Sat", value: 25 },
    { day: "Sun", value: 23 },
  ]
  const data = (function () {
    if (filters.range === "30d") {
      const weekSum = baseWeek.reduce((acc, p) => acc + p.value, 0)
      return [0, 1, 2, 3].map((w) => ({ day: `Week ${w + 1}`, value: Math.round(weekSum * f * (1 + w * 0.05)) }))
    }
    return baseWeek.map((p) => ({ ...p, value: Math.round(p.value * f) }))
  })()
  const metrics = [
    { label: "Total minutes", value: String(Math.round(184 * f)), delta: "+16" },
    { label: "Avg session", value: `${Math.max(5, Math.round(7 * f))}m ${Math.max(1, Math.round(4 * f))}s`, delta: "+38s" },
    { label: "Longest streak", value: `${Math.round(12 * (f / 1.1))} days` },
  ]
  const hours = ["9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"]
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  const values = [
    [0,1,0,2,1,0,0],
    [0,3,2,1,1,0,1],
    [1,0,3,0,1,1,0],
    [2,1,0,2,0,0,1],
    [0,2,8,7,2,1,0],
    [1,3,1,2,2,1,0],
    [3,4,0,1,1,1,1],
    [2,1,0,1,0,0,1],
    [1,0,1,0,1,0,0],
  ]
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold">Conversation time</h1>
      <div className="mt-4">
        <TopFilters />
      </div>
      <div className="mt-4">
        <MetricCards items={metrics} />
      </div>
      <Card className="p-4 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Engagement over time</h3>
          <span className="text-sm text-muted-foreground">New conversations</span>
        </div>
        <div className="h-64 mt-2">
          <EngagementLineChart data={data} />
        </div>
      </Card>
      <Card className="p-4 mt-4">
        <h3 className="font-medium">Busiest times</h3>
        <div className="mt-3">
          <BusiestHeatmap hours={hours} days={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} values={values} />
        </div>
      </Card>
    </main>
  )
}


