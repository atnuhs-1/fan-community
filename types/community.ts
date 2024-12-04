export type Member = {
  id: string;
  userId: string;
  communityId: string;
  // role: string;
  // joinedAt: Date;
  user: {
    // id: string;
    name: string | null;
    // email: string | null;
    image: string | null;
  };
};

export interface CommunityWithMeta {
  id: string;
  name: string;
  description: string | null;
  updatedAt: Date;
}