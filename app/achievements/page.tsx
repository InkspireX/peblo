"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TopFilters } from "@/components/dashboard/top-filters"
import { useFilters } from "@/components/filters-provider"
import { BadgeGrid } from "@/components/dashboard/badge-grid"

export default function Page() {
  const { filters } = useFilters()
  const more = filters.range !== "7d"
  const badges = ["5-day streak", "Reading star", "Curiosity champ", ...(more ? ["Explorer", "Math wiz"] : [])]
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold">Achievements</h1>
      <div className="mt-4">
        <TopFilters />
      </div>
      <Card className="p-4 mt-4 h-[32rem] flex flex-col">
        <h3 className="font-medium">Unlocked badges</h3>
        <div className="mt-4 flex-1">
          <BadgeGrid items={badges.map((b) => ({ title: b, earned: true }))} />
        </div>
      </Card>
      <Card className="p-4 mt-4">
        <h3 className="font-medium">What to encourage next</h3>
        <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
          <li>Try a "teach-back": ask your child to explain a topic in their own words.</li>
          <li>Set a weekend mini-goal (e.g., 3 new animal facts).</li>
          <li>Celebrate effort more than outcome to build a growth mindset.</li>
        </ul>
      </Card>
    </main>
  )
}


