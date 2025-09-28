"use client"

import * as React from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Label } from "recharts"
import { useDrilldown } from "@/components/drilldown-provider"

type Slice = { name: string; value: number }

export function EfficiencyDonut({ data }: { data: Slice[] }) {
  const colors = [
    "var(--chart-2)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-3)",
    "var(--muted-foreground)",
  ]

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const total = React.useMemo(() => data.reduce((acc, s) => acc + s.value, 0), [data])
  const active = activeIndex != null ? data[activeIndex] : null
  const { openDrilldown } = useDrilldown()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          <filter id="donutShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          startAngle={90}
          endAngle={-270}
          innerRadius="56%"
          outerRadius="78%"
          cx="42%"
          paddingAngle={2}
          cornerRadius={6}
          stroke="var(--card)"
          strokeWidth={2}
          onMouseEnter={(_, idx) => setActiveIndex(idx)}
          onMouseLeave={() => setActiveIndex(null)}
          onClick={(_, idx) => {
            const s = data[idx]
            openDrilldown(s.name, (
              <div>
                <p className="text-muted-foreground">Deep dive into {s.name}</p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Count: {s.value.toLocaleString()}</li>
                  <li>Share: {((s.value / Math.max(1, total)) * 100).toFixed(1)}%</li>
                </ul>
              </div>
            ))
          }}
          style={{ filter: "url(#donutShadow)" } as any}
        >
          {data.map((_, i) => (
            <Cell
              key={i}
              fill={colors[i % colors.length]}
              opacity={activeIndex == null || activeIndex === i ? 1 : 0.5}
            />
          ))}
          <Label
            position="center"
            content={(props: any) => {
              const { viewBox } = props
              if (!viewBox || typeof viewBox.cx !== "number" || typeof viewBox.cy !== "number") return null
              const title = active?.name ?? "Total"
              const value = active?.value ?? total
              return (
                <g>
                  <text x={viewBox.cx} y={viewBox.cy - 6} textAnchor="middle" fill="var(--foreground)" fontSize={14} fontWeight={600}>
                    {title}
                  </text>
                  <text x={viewBox.cx} y={viewBox.cy + 14} textAnchor="middle" fill="var(--muted-foreground)" fontSize={12}>
                    {value.toLocaleString()}
                  </text>
                </g>
              )
            }}
          />
        </Pie>
        <Tooltip
          contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }}
          labelStyle={{ fontSize: 12 }}
        />
        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ paddingLeft: 8 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
