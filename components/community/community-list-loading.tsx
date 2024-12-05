import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function CommunityListLoading() {
  return (
    <div>
      {/* ヘッダー部分 */}
      <div className="flex flex-row items-center gap-8 ps-8 pt-4 pb-1 pe-8">
        <h2 className="flex w-full overflow-hidden font-semibold text-2xl">
          <Skeleton className="h-8 w-32" />
        </h2>
        <div className="flex">
          <Button className="py-1" size="sm" disabled>
            新規作成
          </Button>
        </div>
      </div>

      {/* カードリスト */}
      <div className="overflow-y-hidden overflow-x-scroll hide-scrollbar px-8 py-2 pb-5 pt-1">
        <ul className="flex w-fit flex-row">
          {[1, 2, 3, 4].map((index) => (
            <li key={index} className="mr-4 lg:mr-5">
              <div className="w-[210px]">
                {/* サムネイル */}
                <div className="overflow-hidden rounded-lg bg-gray-100 aspect-video">
                  <Skeleton className="h-full w-full" />
                </div>
                {/* コンテンツ */}
                <div className="flex flex-col justify-start rounded-b-lg gap-2 p-2">
                  <Skeleton className="h-10 w-full" />
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-4" />
                    </div>
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}