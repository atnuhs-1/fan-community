import { Suspense } from "react";
import CommunityList from "@/components/community/community-list";
import CommunityListLoading from "@/components/community/community-list-loading";
import Guide from "@/components/guide";
import PerformanceList from "@/components/home/PerformanceList";
// import CommunityList from "@/components/community-list";

export default async function Home() {
  return (
    <div className="w-full overflow-hidden lg:rounded-lg bg-white">
      <Guide />

      <Suspense fallback={<CommunityListLoading/>}>
        <PerformanceList />
      </Suspense>

      <Suspense fallback={<CommunityListLoading />}>
        <CommunityList />
      </Suspense>

      <Suspense
        fallback={
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        }
      >
        <div className="p-8">
          <h2 className="font-bold text-2xl">ライブ</h2>
        </div>
        {/* <SessionInfo /> */}
      </Suspense>
    </div>
  );
}
