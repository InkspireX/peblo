import { Card } from "@/components/ui/card"

type Metric = {
  label: string
  value: string
  delta?: string
}

export function MetricCards({ items }: { items: Metric[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((m, i) => (
        <Card key={m.label} className="p-4">
          <div
            className="h-1 w-full rounded-md"
            style={{
              background:
                i % 3 === 0
                  ? "oklch(var(--chart-2))"
                  : i % 3 === 1
                  ? "oklch(var(--chart-3))"
                  : "oklch(var(--chart-4))",
            }}
          />
          <div className="mt-3 flex items-start justify-between">
            <h3 className="text-sm text-muted-foreground">{m.label}</h3>
            {m.delta ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-foreground/80">{m.delta}</span>
            ) : null}
          </div>
          <div className="mt-2 text-3xl font-semibold">{m.value}</div>
        </Card>
      ))}
    </div>
  )
}
