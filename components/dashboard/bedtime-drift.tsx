"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts"

type Item = { day: string; minutesFromTarget: number }

export function BedtimeDriftChart({ data }: { data: Item[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="driftFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={"var(--chart-2)"} stopOpacity={0.35} />
            <stop offset="100%" stopColor={"var(--chart-2)"} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} width={40} unit="m" domain={[-90, 90]} />
        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} labelStyle={{ fontSize: 12 }} />
        <ReferenceLine y={0} stroke="var(--muted-foreground)" />
        <Area type="monotone" dataKey="minutesFromTarget" stroke={"var(--chart-2)"} strokeWidth={2} fill="url(#driftFill)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}


