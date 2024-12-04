import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, SquareChartGantt } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full rounded-lg shadow-lg bg-white">
      {/* コミュニティ情報 */}
      <div className="p-6 space-y-6">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* タイムライン */}
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-7 w-32" />
          <div className="flex items-center gap-2 bg-slate-200 text-white px-4 py-2 rounded-lg">
            <SquareChartGantt className="w-5 h-5 text-slate-300" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="h-32 p-4 shadow-inner shadow-gray-200 bg-white rounded-md">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      {/* ライブ情報 */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-2 bg-blue-100 text-white px-4 py-2 rounded-lg">
            <PlusCircle className="w-5 h-5 text-blue-200" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-4 w-96" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>

              <div className="flex gap-6 mt-4">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="mt-4 pl-4 space-y-2">
                {[1, 2].map((j) => (
                  <Skeleton key={j} className="h-4 w-64" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}