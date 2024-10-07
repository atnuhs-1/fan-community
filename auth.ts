import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      console.log("------- jwt callback -------");

      // サインイン時
      if (user) {
        console.log("--サインイン--");
        console.log("user: ", user);
        console.log("token: ", token);
        console.log("account: ", account);
        console.log("profile: ", profile);
        token.name = user.name;
        token.isProfileComplete = user.isProfileComplete;
      }

      // セッション更新時の処理
      if (trigger == "update" && session?.name) {
        console.log("-- セッション更新 --");
        token.name = session.name;
        token.isProfileComplete = true; // 名前が設定されたらtrueにする
      }
      return token;
    },
    session: ({ token, session, user }) => {
      console.log("------- session callback -------");

      if (session.user) {
        session.user.name = token.name as string;
        session.user.id = token.sub as string;
        // session.user.communityList = token.communityList;
        session.user.isProfileComplete = token.isProfileComplete as boolean;
      }
      // console.log("token", token);
      // console.log("session", session);
      return session;
    },
  },
  debug: true,
  // pages: {
  //   signIn: "/signin",
  // },
});
