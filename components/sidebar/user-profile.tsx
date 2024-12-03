import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { SignIn, SignOut } from "../auth-component";
import { auth } from "@/auth";

export default async function UserProfile() {
  const session = await auth();

  if (!session?.user) {
    return <SignIn className="w-full" />
  }
  return (
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
          <Link href="/#" className="flex w-full items-center cursor-pointer">
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
  );
}
