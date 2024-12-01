// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

// export const { auth: middleware }  = NextAuth(authConfig)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import authConfig from "./auth.config";

export async function middleware(request: NextRequest) {
  console.log("------ middleware ------");
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET as string,
    cookieName: process.env.TOKEN_COOKIE_NAME,
  });

  // console.log("token", token);

  if (token) {
    // ユーザーがサインイン済み
    // console.log("token.isProfileComplete: ", token.isProfileComplete);
    if (token.isProfileComplete === false) {
      // 名前を設定していない場合、set-nameにリダイレクト
      if (request.nextUrl.pathname !== "/auth/set-name") {
        console.log("set-nameにリダイレクト");
        return NextResponse.redirect(new URL("/auth/set-name", request.url));
      }
    } else {
      // 名前が設定済みでset-nameにアクセスがきたときホームへリダイレクト
      if (request.nextUrl.pathname === "/auth/set-name") {
        console.log("名前を設定済みのため、ホームにリダイレクト");
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } else {
    // 未サインイン
    if (request.nextUrl.pathname === "/auth/set-name") {
      console.log("サインインしてないため、ホームにリダイレクト");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // その他のミドルウェアロジック...
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
