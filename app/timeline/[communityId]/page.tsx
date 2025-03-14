import { auth } from "@/auth";
import { SignIn } from "@/components/auth-component";
import { getPosts } from "@/app/actions/posts";
// import ClientTimeline from "@/components/ClientTimeline";
import { Post } from "@/types/post";
import { Member } from "@/types/community";
import { getCommunityMembers } from "@/app/actions/community-members";

type GetPostsResult = {
  success: boolean;
  posts?: Post[];
  error?: string;
};

type GetMembersResult = {
  success: boolean;
  members?: Member[];
  communityName?: string;
  error?: string;
};

export default async function CommunityPage({
  params,
}: {
  params: { communityId: string };
}) {
  const { communityId } = params;
  const session = await auth();
  const isSignedIn = !!session;
  // const isMember = session?.user.communityList.includes(communityId); // Sessionに追加したcommunityListを使用する場合（なくてもいけた）
  let isMember = false;

  const postResult: GetPostsResult = await getPosts(communityId);
  const memberResult: GetMembersResult = await getCommunityMembers(communityId);
  console.log("memberResult: ", memberResult);

  if(memberResult.members) {
    const communityUserId = memberResult.members.map(member => {
      return member.userId
    })
    if(session) {
      isMember = communityUserId.includes(session?.user.id);
    }
  }

  
  

  if (!postResult.posts || !memberResult.members) {
    return <div>Error</div>;
  }

  return (
    <>
      {/* <ClientTimeline
        initialPosts={postResult.posts}
        initialMembers={memberResult.members}
        communityId={communityId}
        communityName={memberResult.communityName}
        isSignedIn={isSignedIn}
        isMember={isMember}
        image={session?.user.image}
      /> */}
    </>
  );
}
