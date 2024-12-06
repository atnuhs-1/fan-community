import { getPerformanceList } from "@/app/actions/performance";
import Link from "next/link";
import { Button } from "../ui/button";
import { PerformanceCard } from "./performance-card";

interface PerformanceListProps {
  title?: string;
}

export default async function PerformanceList({
  title = "タイムライン",
}: PerformanceListProps) {
  const performanceList = await getPerformanceList();

  return (
    <div className="">
      <div className="flex flex-row items-center gap-8 ps-8 pt-4 pb-1 pe-8">
        <h2 className="flex w-full overflow-hidden font-semibold text-2xl">
          {title}
        </h2>
        {/* <Link href="/community/create" className="flex">
          <Button className="py-1" size="sm">新規作成</Button>
        </Link> */}
      </div>

      {performanceList.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">
            コミュニティがまだ作成されていません
          </p>
        </div>
      ) : (
        <div className="overflow-y-hidden overflow-x-scroll hide-scrollbar px-8 py-2 pb-5 pt-1">
          <ul className="flex w-fit flex-row">
            {performanceList.map((performance) => (
              <li key={performance.id} className="mr-4 lg:mr-5">
                <Link href={`/community/${performance.live.communityId}/timeline?liveId=${performance.liveId}&performanceId=${performance.id}`}>
                  <PerformanceCard performance={performance} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
