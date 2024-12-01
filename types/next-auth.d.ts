import { UserRole } from "@prisma/client";
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
      role: UserRole;
      
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    isProfileComplete: boolean;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    isProfileComplete: boolean;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser extends User {
    isProfileComplete: boolean;
    role: UserRole;
  }
}