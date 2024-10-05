import { Member } from "@/types/community";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type CommunityMemberListProps = {
  members: Member[];
};

export default function CommunityMemberList({
  members,
}: CommunityMemberListProps) {
  return (
    <div className="flex flex-col p-3 rounded-md bg-slate-100">
      <h2 className="mb-2 font-semibold">メンバー</h2>
      <ul className="">
        {members.map((member) => (
          <li key={member.id} className="flex space-x-2 items-center">
            <Avatar className="h-9 w-9 flex rounded-full">
              <AvatarImage
                src={member.user.image ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">{member.user.name || "Anonymous"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
