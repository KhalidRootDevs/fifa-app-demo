import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TopScorersLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="rounded-md border border-gray-200 dark:border-gray-800">
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <div className="grid grid-cols-8 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-4">
                  <div className="grid grid-cols-8 gap-4 items-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-5 w-full" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-7 rounded" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-5 w-8 mx-auto" />
                    <Skeleton className="h-5 w-8 mx-auto" />
                    <Skeleton className="h-5 w-8 mx-auto" />
                    <Skeleton className="h-5 w-16 mx-auto" />
                    <Skeleton className="h-6 w-16 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
