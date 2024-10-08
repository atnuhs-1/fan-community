import NextAuth, {type DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      communityList: string[];
      isProfileComplete: boolean;
      
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    isProfileComplete: boolean;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    isProfileComplete: boolean
  }
}