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

export default async function SideBar() {
  const session = await auth();
  return (
    <aside className="w-64 border-r flex flex-col">
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
      </nav>

      {/* <div className="p-4">
        <Button className="w-full">ポストする</Button>
      </div> */}

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
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>
                  <Link href="/profile">プロフィール</Link>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>
                  <Link href="/#">アカウントを管理</Link>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>
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
