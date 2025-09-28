"use client"

import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Legend, Line } from "recharts"

type Item = { day: string; hours: number; target?: number }

export function SleepDurationChart({ data, target = 10 }: { data: Item[]; target?: number }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} width={32} unit="h" domain={[0, 14]} />
        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} labelStyle={{ fontSize: 12 }} />
        <Legend verticalAlign="top" height={24} />
        <ReferenceLine y={target} stroke="var(--muted-foreground)" strokeDasharray="4 4" label={{ value: `Goal ${target}h`, position: "left", fill: "var(--muted-foreground)", fontSize: 12 }} />
        <Bar name="Sleep" dataKey="hours" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
        <Line name="Trend" type="monotone" dataKey="hours" stroke="var(--chart-4)" strokeWidth={2} dot={{ r: 2 }} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}


