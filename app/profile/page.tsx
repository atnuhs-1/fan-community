"use server"

import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/db";
import PostItem from "@/components/PostItem";
import { getUserProfile } from "../actions/profile";
import EditProfile from "@/components/EditProfile";
import { redirect } from "next/navigation";


export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  const user_info = await getUserProfile(session?.user.id);

  console.log("info: ", user_info);

  return (
    <>
      <main className="flex-1 overflow-auto">
        <div className="bg-white shadow-md rounded-lg flex flex-col">
          <div className="p-10">
            <div className="mb-4">
              <Avatar className="h-16 w-16 rounded-full">
                <AvatarImage
                  src={user_info?.image ?? "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="mb-4">
              <p className="font-bold text-xl">{user_info?.name}</p>
              <EditProfile userId={session?.user.id}/>
            </div>
          </div>

          <div className="">
            {user_info?.posts ? (
              user_info?.posts.map((post) => (
                <PostItem key={post.id} post={post} />
              ))
            ) : (
              <>投稿がありません</>
            )}
          </div>
        </div>
      </main>

      <aside className="w-96 border-l flex flex-col p-4">
        <div>
          <h2>コミュニティ</h2>
          {user_info.communities ? (
            <div className="space-y-2">
              {user_info?.communities.map((community) => (
                <div key={community.name}>{community.name}</div>
              ))}
            </div>
          ) : (
            <>コミュニティ</>
          )}
        </div>
      </aside>
    </>
  );
}
