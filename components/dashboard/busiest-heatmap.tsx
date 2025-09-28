type Props = {
  hours: string[]
  days: string[]
  values: number[][]
}

export function BusiestHeatmap({ hours, days, values }: Props) {
  const max = Math.max(...values.flat())
  return (
    <div className="overflow-auto">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-[96px_repeat(7,minmax(0,1fr))] gap-2">
          <div />
          {days.map((d) => (
            <div key={d} className="text-xs text-center text-muted-foreground">
              {d}
            </div>
          ))}
          {hours.map((h, rowIdx) => (
            <div key={h} className="contents">
              <div className="text-xs text-muted-foreground">{h}</div>
              {days.map((_, colIdx) => {
                const v = values[rowIdx][colIdx] ?? 0
                const intensity = max === 0 ? 0 : v / max
                // map intensity to blue brand shades using opacity
                const bg = `oklch(var(--chart-3) / ${0.15 + intensity * 0.75})`
                return (
                  <div
                    key={colIdx}
                    className="h-8 rounded-md border"
                    style={{ background: bg, borderColor: "oklch(var(--border))" }}
                    aria-label={`${h} on ${days[colIdx]}: ${v} conversations`}
                    title={`${v} conversations`}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <div className="mt-2 h-2 rounded-full bg-accent" />
      </div>
    </div>
  )
}
