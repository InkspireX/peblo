"use client"

import { Card } from "@/components/ui/card"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { EngagementLineChart } from "@/components/dashboard/workload-line-chart"
import { EfficiencyDonut } from "@/components/dashboard/efficiency-donut"
import { TopFilters } from "@/components/dashboard/top-filters"
import { useFilters } from "@/components/filters-provider"

export default function Page() {
  const { filters } = useFilters()
  const f = filters.range === "7d" ? 1 : filters.range === "14d" ? 1.15 : 1.3
  const baseWeek = [
    { day: "Mon", value: 12 },
    { day: "Tue", value: 18 },
    { day: "Wed", value: 20 },
    { day: "Thu", value: 28 },
    { day: "Fri", value: 24 },
    { day: "Sat", value: 22 },
    { day: "Sun", value: 21 },
  ]
  const data = (function () {
    if (filters.range === "30d") {
      const weekSum = baseWeek.reduce((acc, p) => acc + p.value, 0)
      return [0, 1, 2, 3].map((w) => ({ day: `Week ${w + 1}`, value: Math.round(weekSum * f * (1 + w * 0.05)) }))
    }
    return baseWeek.map((p) => ({ ...p, value: Math.round(p.value * f) }))
  })()
  const metrics = [
    { label: "Questions asked", value: String(Math.round(182 * f)), delta: "+12" },
    { label: "New topics explored", value: String(Math.round(17 * f)), delta: "+3" },
    { label: "Avg follow-ups", value: (2.6 * f).toFixed(1), delta: "+0.3" },
  ]
  const donut = [
    { name: "Why/How", value: 48 },
    { name: "Stories", value: 22 },
    { name: "Math/Logic", value: 14 },
    { name: "Science", value: 10 },
    { name: "Creative", value: 6 },
  ]
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold">Curiosity</h1>
      <div className="mt-4">
        <TopFilters />
      </div>
      <div className="mt-4">
        <MetricCards items={metrics} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card className="p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Curiosity over time</h3>
            <span className="text-sm text-muted-foreground">Sessions</span>
          </div>
          <div className="h-64 mt-2">
            <EngagementLineChart data={data} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Question types</h3>
            <span className="text-sm text-muted-foreground">This week</span>
          </div>
          <div className="h-64 mt-2">
            <EfficiencyDonut data={donut} />
          </div>
        </Card>
      </div>
      <Card className="p-4 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">What this means for growth</h3>
          <span className="text-sm text-muted-foreground">Parent summary</span>
        </div>
        <ul className="mt-3 list-disc pl-5 text-sm text-foreground/90 space-y-2">
          <li>Steady increase in Why/How questions suggests stronger critical thinking.</li>
          <li>Balanced mix of stories and logic indicates both imagination and reasoning are developing.</li>
          <li>Encourage follow-up questions by asking “What do you think will happen next?”</li>
        </ul>
      </Card>
    </main>
  )
}


