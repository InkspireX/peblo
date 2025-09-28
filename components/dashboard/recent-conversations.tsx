"use client"

import { Badge } from "@/components/ui/badge"
import { useDrilldown } from "@/components/drilldown-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Row = {
  at: string
  type: string
  topic: string
  duration: string
  note: string
  flagged?: boolean
}

export function RecentConversations({ rows }: { rows: Row[] }) {
  const { openDrilldown } = useDrilldown()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="hidden md:table-cell">Notes</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i} className="cursor-pointer" onClick={() => openDrilldown(r.topic, (
            <div>
              <p className="text-sm text-muted-foreground">{r.type} • {r.duration}</p>
              <p className="mt-2">{r.note}</p>
              <p className="text-xs text-muted-foreground mt-2">{r.at}</p>
            </div>
          ))}>
            <TableCell>{r.at}</TableCell>
            <TableCell>
              <Badge>{r.type}</Badge>
            </TableCell>
            <TableCell>{r.topic}</TableCell>
            <TableCell>{r.duration}</TableCell>
            <TableCell className="hidden md:table-cell text-muted-foreground">{r.note}</TableCell>
            <TableCell className="text-right">
              {r.flagged ? <Badge variant="destructive">Flagged</Badge> : <Badge variant="secondary">OK</Badge>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
