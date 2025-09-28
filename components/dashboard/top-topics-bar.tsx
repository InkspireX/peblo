"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Brush } from "recharts"
import { useDrilldown } from "@/components/drilldown-provider"

type Topic = { topic: string; count: number }

export function TopTopicsBar({ data }: { data: Topic[] }) {
  const bar = "var(--chart-3)" // blue
  const { openDrilldown } = useDrilldown()
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="topic" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} width={32} />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
          }}
          labelStyle={{ fontSize: 12 }}
        />
        <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} onClick={(data) => openDrilldown(String(data.topic), <div>Count: {data.count}</div>)} />
        {/* colorful overlay gradient */}
        <defs>
          <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={bar} stopOpacity={0.9} />
            <stop offset="100%" stopColor={"var(--chart-4)"} stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <Brush travellerWidth={8} height={12} stroke={bar} />
      </BarChart>
    </ResponsiveContainer>
  )
}
