import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Flag = { at: string; type: string; severity: "low" | "medium" | "high"; note: string }

export function SafetyFlags({ items }: { items: Flag[] }) {
  const colorFor = (sev: Flag["severity"]) =>
    sev === "high" ? "destructive" : sev === "medium" ? "default" : "secondary"

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Safety flags</h3>
        <span className="text-sm text-muted-foreground">{items.length} total</span>
      </div>
      <ul className="mt-3 space-y-3">
        {items.map((f, i) => (
          <li key={i} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm">
                <span className="font-medium">{f.type}</span> <span className="text-muted-foreground">• {f.note}</span>
              </p>
              <p className="text-xs text-muted-foreground">{f.at}</p>
            </div>
            <Badge variant={colorFor(f.severity) as any}>{f.severity}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  )
}
