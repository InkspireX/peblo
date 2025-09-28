"use client"

import { Card } from "@/components/ui/card"
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts"

type Values = {
  streakDays: number
  readingPct: number
  bedtimePct: number
}

function Gauge({
  label,
  value,
  suffix = "%",
  color,
}: {
  label: string
  value: number
  suffix?: string
  color: string
}) {
  const clamped = Math.max(0, Math.min(100, value))
  const data = [{ label, value: clamped, full: 100 }]
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-28 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart data={data} innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={450}>
            <RadialBar dataKey="full" cornerRadius={8} fill="var(--muted)" />
            <RadialBar dataKey="value" cornerRadius={8} fill={color} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-xl font-semibold" style={{ color }}>{clamped}{suffix}</div>
      </div>
    </div>
  )
}

export function StreaksGoals({ values }: { values: Values }) {
  const streakPct = Math.min(values.streakDays * 10, 100)
  return (
    <Card className="p-4">
      <h3 className="font-medium">Streaks & goals</h3>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Gauge label="Daily streak" value={streakPct} suffix="%" color="var(--chart-2)" />
        <Gauge label="Reading minutes" value={values.readingPct} suffix="%" color="var(--chart-4)" />
        <Gauge label="Bedtime routine" value={values.bedtimePct} suffix="%" color="var(--chart-3)" />
      </div>
    </Card>
  )
}
