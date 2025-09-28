"use client"

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, Brush } from "recharts"
import { useDrilldown } from "@/components/drilldown-provider"

type Point = { day: string; value: number }

export function EngagementLineChart({ data }: { data: Point[] }) {
  const brand = "var(--chart-2)" // blue-green
  const { openDrilldown } = useDrilldown()
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} width={32} />
        <Tooltip
          contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }}
          labelStyle={{ fontSize: 12 }}
        />
        <Area type="monotone" dataKey="value" stroke="none" fill="url(#lineFill)" />
        <Line
          type="monotone"
          dataKey="value"
          stroke={brand}
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 1, onClick: (e: any) => openDrilldown(String(e.payload.day), <div>Value: {e.payload.value}</div>) }}
          activeDot={{ r: 5 }}
        />
        {/* subtle gradient fill */}
        <defs>
          <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={"var(--chart-2)"} stopOpacity={0.25} />
            <stop offset="100%" stopColor={"var(--chart-2)"} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Brush travellerWidth={8} height={12} stroke={brand} />
      </LineChart>
    </ResponsiveContainer>
  )
}
