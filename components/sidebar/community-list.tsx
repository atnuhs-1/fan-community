import { getUserProfile } from "@/app/actions/profile";
import { auth } from "@/auth";
import NavButton from "../NavButton";
import { Bell } from "lucide-react";

export default async function CommunityList() {
  const session = await auth();
  if (!session) return null;
  
  const user_info = await getUserProfile(session.user.id);
  
  if (!user_info?.communities) return null;

  return (
    <div className="space-y-2">
      {user_info.communities.map((community) => (
        <NavButton 
          key={community.id} 
          icon={<Bell />} 
          label={community.name} 
          href={`/timeline/${community.id}`} 
        />
      ))}
      {/* コミュニティ一覧 */}
        {/* <h2 className="px-4 pt-4 pb-1 font-bold border-b">コミュニティ</h2>
        {user_info?.communities && (
          <div className="space-y-2">
            {user_info?.communities.map((community) => (
              <NavButton key={community.id} icon={<Bell />} label={community.name} href={`/community/${community.id}`} />
            ))}
          </div>
        )} */}
    </div>
  );
}