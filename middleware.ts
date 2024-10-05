// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

// export const { auth: middleware }  = NextAuth(authConfig)

// middleware.ts
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
    cookieName: "authjs.session-token",
  });

  // console.log("token", token);

  // /auth/set-nameへのアクセスは常に許可
  if (request.nextUrl.pathname === "/auth/set-name") {
    return NextResponse.next();
  }

  // ユーザーがサインインしていて、isNewUserがtrueの場合、name設定ページにリダイレクト
  if (token && token.isNewUser === true) {
    // 現在のURLが/auth/set-name出ない場合のみリダイレクト
    if (request.nextUrl.pathname !== "/auth/set-name") {
      return NextResponse.redirect(new URL("/auth/set-name", request.url));
    }
  }

  // その他のミドルウェアロジック...
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
