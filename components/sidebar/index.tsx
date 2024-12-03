import React, { Suspense } from "react";
import UserProfile from "@/components/sidebar/user-profile";
import CommunityList from "./community-list";
import Navigation from "./navigation";

export default async function SideBar() {
  return (
    <aside className="flex flex-col bg-white rounded-lg">
      <nav className="p-4 space-y-2 ">
        <Navigation />

        <h2 className="px-4 pt-4 pb-1 font-bold border-b">タイムライン</h2>
        <Suspense fallback={<div className="p-4 bg-slate-50 rounded-md"></div>}>
          <CommunityList />
        </Suspense>
      </nav>

      <div className="mt-4 p-4">
        <Suspense fallback={<div className="p-4">Loading Profile...</div>}>
          <UserProfile />
        </Suspense>
      </div>
    </aside>
  );
}
