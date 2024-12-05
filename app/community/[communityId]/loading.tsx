import { Skeleton } from "@/components/ui/skeleton";

function CommunityHeaderSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-5 w-2/3" />
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-32" />
      <div className="h-[300px] overflow-y-auto shadow-inner rounded-lg bg-gray-50 p-1">
      <div className="">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 p-2 border bg-white rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}

function LivesSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="grid gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-96" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
            <div className="flex gap-6 mb-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="pl-4 space-y-2">
              {[1, 2].map((j) => (
                <Skeleton key={j} className="h-4 w-64" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="w-full h-full rounded-lg shadow-lg bg-white">
      <CommunityHeaderSkeleton />
      <TimelineSkeleton />
      <LivesSkeleton />
    </div>
  );
}