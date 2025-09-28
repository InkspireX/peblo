"use client"

import { TopFilters } from "@/components/dashboard/top-filters"
import { useFilters } from "@/components/filters-provider"
export default function Page() {
  const { filters } = useFilters()
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold">Settings</h1>
      <div className="mt-4">
        <TopFilters />
      </div>
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Content filters</h3>
          <p className="text-sm text-muted-foreground">Choose which topics the toy avoids. Current range: {filters.range}</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Quiet hours</h3>
          <p className="text-sm text-muted-foreground">Set times when conversations are paused for sleep.</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Privacy</h3>
          <p className="text-sm text-muted-foreground">Manage data retention and sharing preferences.</p>
        </div>
      </div>
    </main>
  )
}


