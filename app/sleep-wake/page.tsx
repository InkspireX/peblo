"use client"

import { Card } from "@/components/ui/card"
import { StreaksGoals } from "@/components/dashboard/streaks-goals"
import { TopFilters } from "@/components/dashboard/top-filters"
import { useFilters } from "@/components/filters-provider"
import { SleepDurationChart } from "@/components/dashboard/sleep-duration"
import { BedtimeDriftChart } from "@/components/dashboard/bedtime-drift"

export default function Page() {
  const { filters } = useFilters()
  const f = filters.range === "7d" ? 1 : filters.range === "14d" ? 1.05 : 1.1
  const values = { streakDays: Math.round(6 * f), readingPct: Math.round(72 * f), bedtimePct: Math.round(84 * f) }
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold">Sleep & wake</h1>
      <div className="mt-4">
        <TopFilters />
      </div>
      <div className="mt-4">
        <StreaksGoals values={values} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Sleep duration</h3>
            <span className="text-sm text-muted-foreground">Goal 10h</span>
          </div>
          <div className="h-64 mt-2">
            <SleepDurationChart
              data={[
                { day: "Mon", hours: Math.round(9 * f) },
                { day: "Tue", hours: Math.round(10 * f) },
                { day: "Wed", hours: Math.round(9 * f) },
                { day: "Thu", hours: Math.round(8 * f) },
                { day: "Fri", hours: Math.round(9 * f) },
                { day: "Sat", hours: Math.round(11 * f) },
                { day: "Sun", hours: Math.round(10 * f) },
              ]}
              target={10}
            />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Bedtime drift</h3>
            <span className="text-sm text-muted-foreground">vs 8:00 PM target</span>
          </div>
          <div className="h-64 mt-2">
            <BedtimeDriftChart
              data={[
                { day: "Mon", minutesFromTarget: -10 },
                { day: "Tue", minutesFromTarget: 5 },
                { day: "Wed", minutesFromTarget: 0 },
                { day: "Thu", minutesFromTarget: 15 },
                { day: "Fri", minutesFromTarget: 30 },
                { day: "Sat", minutesFromTarget: -20 },
                { day: "Sun", minutesFromTarget: -5 },
              ]}
            />
          </div>
        </Card>
      </div>
      <Card className="p-4 mt-4">
        <h3 className="font-medium">Bedtime routine insights</h3>
        <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
          <li>Consistent bedtime within a 30-minute window boosts next-day focus.</li>
          <li>Reading 10–15 minutes before sleep improves vocabulary development.</li>
          <li>Consider a calm-down playlist to reduce time-to-sleep.</li>
        </ul>
      </Card>
    </main>
  )
}


