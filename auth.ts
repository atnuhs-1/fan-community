import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      console.log("------- jwt callback -------");

      // サインイン時
      if (user && user.email) {
        console.log("--サインイン--")
        token.name = user.name;
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        
        if (!existingUser) {
          // 新規ユーザー
          console.log("新規ユーザー：名前の設定へ")
          token.isNewUser = true;
        } else {
          // 既存ユーザー
          console.log("既存ユーザー")
          const result = await prisma.user.findMany({
            where: {id: user.id},
            include: {communities: true}
          });
          // communityIdのみを抽出
          const communityList = result[0].communities.map(community => {
            return community.communityId
          })
          token.communityList = communityList;
          token.isNewUser = false;
        }
      }

      // セッション更新時の処理
      if (trigger == "update" && session?.name) {
        console.log("-- セッション更新 --")
        token.name = session.name;
        token.isNewUser = false; // 名前が設定されたらNewUserをfalseに
      }
      return token;
    },
    session: ({ token, session, user }) => {
      console.log("------- session callback -------");

      if (session.user) {
        session.user.name = token.name as string;
        session.user.id = token.sub;
        session.user.isNewUser = token.isNewUser;
        session.user.communityList = token.communityList;
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
