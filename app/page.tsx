import { Suspense } from "react";
import SessionInfo from "@/components/session-info";
import CommunityList from "@/components/community/community-list";
// import CommunityList from "@/components/community-list";

export default async function Home() {
  return (
    <div className="w-full flex flex-col p-4 rounded-lg bg-white">
      <Suspense
        fallback={
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-2/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-14 bg-gray-200 rounded-lg"></div>
              <div className="h-14 bg-gray-200 rounded-lg"></div>
              <div className="h-14 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        }
      >
        <CommunityList />
      </Suspense>

      <Suspense
        fallback={
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        }
      >
        <SessionInfo />
      </Suspense>
    </div>
  );
}
