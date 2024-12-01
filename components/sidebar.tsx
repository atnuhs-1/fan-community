import Link from "next/link";
import {
  LogOut,
  User,
  Menu,
  Settings,
  Home,
  Hash,
  Bell,
  Users,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { SignIn, SignOut } from "./auth-component";
import { Button } from "./ui/button";
import NavButton from "./NavButton";
import React from "react";
import { getUserProfile } from "@/app/actions/profile";

export default async function SideBar() {
  const session = await auth();
  let user_info;
  if (session) {
    user_info = await getUserProfile(session?.user.id);
  }

  return (
    <aside className="w-64 border-r flex flex-col h-screen bg-white rounded-lg lg:fixed">
      <nav className="p-4 space-y-2 flex-grow">
        <div className="px-4 py-2">
          <Eye className="w-12 h-12" />
        </div>

        <NavButton icon={<Home />} label="ホーム" href="/" />
        <NavButton icon={<Hash />} label="話題を検索" href="/#" />
        <NavButton icon={<Bell />} label="通知" href="/#" />
        <NavButton
          icon={<Users />}
          label="コミュニティ作成"
          href="/community/create"
        />

        <h2 className="px-4 pt-4 pb-1 font-bold border-b">タイムライン</h2>
        {user_info?.communities && (
          <div className="space-y-2">
            {user_info?.communities.map((community) => (
              <NavButton key={community.id} icon={<Bell />} label={community.name} href={`/timeline/${community.id}`} />
            ))}
          </div>
        )}
        {/* コミュニティ一覧 */}
        {/* <h2 className="px-4 pt-4 pb-1 font-bold border-b">コミュニティ</h2>
        {user_info?.communities && (
          <div className="space-y-2">
            {user_info?.communities.map((community) => (
              <NavButton key={community.id} icon={<Bell />} label={community.name} href={`/community/${community.id}`} />
            ))}
          </div>
        )} */}
      </nav>

      <div className="mt-auto p-4">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-9 w-9 mr-2 rounded-full">
                  <AvatarImage
                    src={session.user.image ?? "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div>{session.user.name}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>アカウント</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex w-full items-center cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>プロフィール</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/#"
                  className="flex w-full items-center cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>アカウントを管理</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span className="w-full">
                  <SignOut></SignOut>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SignIn className="w-full" />
        )}
      </div>
    </aside>
  );
}
