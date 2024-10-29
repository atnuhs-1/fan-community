"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteUser } from "@/app/actions/profile";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type EditProfileProps = {
  userId: string;
}

export default function EditProfile({userId}: EditProfileProps) {
  const router = useRouter(); //next/navigationとnext/routerの違い調べる

  const handleDelete = async () => { 
    try {
      signOut({redirect: false}); //redirect:false有りだったら/にリダイレクトされたけど、画面上のユーザー情報が更新されずにアイコンとかが残ったまま。リロードしたら消える
      const result = await deleteUser(userId);
      await router.push("/");
    } catch (error) {
      console.error("error: ", error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>a</DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div> */}
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleDelete}
            className="bg-red-500 text-white"
          >
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
