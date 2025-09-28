"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopFilters } from "@/components/dashboard/top-filters"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { EngagementLineChart } from "@/components/dashboard/workload-line-chart"
import { EfficiencyDonut } from "@/components/dashboard/efficiency-donut"
import { TopTopicsBar } from "@/components/dashboard/top-topics-bar"
import { RecentConversations } from "@/components/dashboard/recent-conversations"
import { StreaksGoals } from "@/components/dashboard/streaks-goals"
import { SafetyFlags } from "@/components/dashboard/safety-flags"
import { useFilters } from "@/components/filters-provider"

export default function Page() {
  const { filters } = useFilters()

  const factorFromFilters = () => {
    const rangeFactor = filters.range === "7d" ? 1 : filters.range === "14d" ? 1.15 : 1.3
    const childFactor = filters.child === "Maya" ? 1.1 : 1
    const deviceFactor = filters.device === "Bedroom Toy" ? 0.9 : filters.device === "Travel Toy" ? 0.95 : 1
    return rangeFactor * childFactor * deviceFactor
  }

  const f = factorFromFilters()

  // Mock data reactive to filters; weekly buckets for 30d
  const baseWeek = [
    { day: "Mon", value: 18 },
    { day: "Tue", value: 24 },
    { day: "Wed", value: 21 },
    { day: "Thu", value: 34 },
    { day: "Fri", value: 27 },
    { day: "Sat", value: 25 },
    { day: "Sun", value: 23 },
  ]

  const lineData = (function () {
    if (filters.range === "30d") {
      // Create 4 weekly points using the base pattern with slight growth
      const weekSum = baseWeek.reduce((acc, p) => acc + p.value, 0)
      return [0, 1, 2, 3].map((w) => ({
        day: `Week ${w + 1}`,
        value: Math.round(weekSum * f * (1 + w * 0.05)),
      }))
    }
    // 7d/14d → show one week of daily values scaled
    return baseWeek.map((p) => ({ ...p, value: Math.round(p.value * f) }))
  })()

  const heatmapHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"]
  const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const heatmapValues: number[][] = [
    [0, 1, 0, 2, 1, 0, 0],
    [0, 3, 2, 1, 1, 0, 1],
    [1, 0, 3, 0, 1, 1, 0],
    [2, 1, 0, 2, 0, 0, 1],
    [0, 2, 8, 7, 2, 1, 0],
    [1, 3, 1, 2, 2, 1, 0],
    [3, 4, 0, 1, 1, 1, 1],
    [2, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0],
  ]

  const donutData = [
    { name: "Questions", value: 46 },
    { name: "Stories", value: 22 },
    { name: "Games", value: 18 },
    { name: "Learning", value: 10 },
    { name: "Safety flags", value: 4 },
  ].map((s) => ({ ...s, value: Math.max(1, Math.round(s.value * f)) }))

  const sumConversations = lineData.reduce((acc, p) => acc + p.value, 0)
  const metrics = [
    { label: "Conversations", value: String(sumConversations), delta: "+" + Math.max(1, Math.round(0.1 * sumConversations)) },
    { label: "Avg session length", value: `${Math.max(5, Math.round(7 * f))}m ${Math.max(1, Math.round(4 * f))}s`, delta: "+38s" },
    { label: "Curiosity score", value: String(Math.min(99, Math.round(75 * f))), delta: "+4" },
  ]

  const topicsData = [
    { topic: "Space", count: 32 },
    { topic: "Animals", count: 28 },
    { topic: "Math", count: 21 },
    { topic: "Stories", count: 18 },
    { topic: "Games", count: 14 },
  ]

  const recent = [
    {
      at: "Aug 3, 7:45 PM",
      type: "Question",
      topic: "Dinosaurs",
      duration: "5m 12s",
      note: "Why did T‑Rex have tiny arms?",
      flagged: false,
    },
    {
      at: "Aug 3, 6:10 PM",
      type: "Story",
      topic: "Bedtime",
      duration: "8m 03s",
      note: "Calming bedtime story",
      flagged: false,
    },
    {
      at: "Aug 2, 4:22 PM",
      type: "Game",
      topic: "Riddles",
      duration: "4m 20s",
      note: "Guess the animal",
      flagged: false,
    },
    {
      at: "Aug 2, 1:05 PM",
      type: "Question",
      topic: "Online video",
      duration: "1m 10s",
      note: "Mentioned YouTube link",
      flagged: true,
    },
  ]

  const streaks = { streakDays: 6, readingPct: 72, bedtimePct: 84 }

  const flags = [
    { at: "Aug 2, 1:05 PM", type: "External link", severity: "medium", note: "Asked about a YouTube link" },
    { at: "Jul 31, 9:12 AM", type: "Private info", severity: "low", note: "Mentioned home address" },
  ]

  return (
    <main className="min-h-dvh flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-4 md:p-6">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-pretty font-peblo-logo">Peblo</h1>
            <p className="text-sm text-muted-foreground">Overview of your child’s activity and curiosity trends</p>
          </div>
          <Button variant="default">Export</Button>
        </header>

        <div className="mt-4">
          <TopFilters />
        </div>

        <div className="mt-4 grid gap-4">
          <MetricCards items={metrics} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="p-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Engagement over time</h3>
                <span className="text-sm text-muted-foreground">New conversations</span>
              </div>
              <div className="h-56 mt-2">
                <EngagementLineChart data={lineData} />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Activity mix</h3>
                <span className="text-sm text-muted-foreground">This week</span>
              </div>
              <div className="h-56 mt-2">
                <EfficiencyDonut data={donutData} />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <Card className="p-4 xl:col-span-2 h-[32rem] flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Recent conversations</h3>
                <span className="text-sm text-muted-foreground">Last 7 days</span>
              </div>
              <div className="mt-3 flex-1 overflow-auto">
                <RecentConversations rows={recent} />
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Top topics</h3>
                  <span className="text-sm text-muted-foreground">By count</span>
                </div>
                <div className="h-56 mt-2">
                  <TopTopicsBar data={topicsData} />
                </div>
              </Card>

              <StreaksGoals values={streaks} />

              <SafetyFlags items={flags} />
            </div>
          </div>

          {/* Reference dashboard removed */}
        </div>
      </div>
    </main>
  )
}
