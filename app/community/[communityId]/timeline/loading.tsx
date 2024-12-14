// loading.tsx
export default function TimelineLoading() {
  return (
    <div className="w-full h-full rounded-lg shadow-lg bg-white">
      <TimelineFiltersSkeleton />
      <div className="divide-y">
        {[...Array(5)].map((_, i) => (
          <TimelinePostSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function TimelineFiltersSkeleton() {
  return (
    <div className="sticky top-0 bg-white border-b z-10">
      {/* ライブフィルター */}
      <div className="p-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-16 h-8 bg-gray-200 rounded-full animate-pulse" />
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-32 h-8 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </div>

      {/* 公演フィルター（常に表示） */}
      <div className="px-4 pb-4 -mt-2 flex items-center gap-2 overflow-x-auto">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="w-40 h-8 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export function TimelinePostSkeleton() {
  return (
    <div className="p-4">
      <div className="flex items-start gap-4">
        {/* アバタースケルトン */}
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />

        {/* 投稿内容スケルトン */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {/* 名前スケルトン */}
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
            {/* 時間スケルトン */}
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* バッジスケルトン */}
          <div className="mt-1">
            <div className="w-16 h-5 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* ライブ情報スケルトン */}
          <div className="mt-1">
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* 本文スケルトン */}
          <div className="mt-2 space-y-2">
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* 画像スケルトン */}
          <div className="mt-2 grid gap-2 grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}