import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { parse } from "@/lib/middleware/utils";

export default async function AppMiddleware(req: NextRequest) {
  const { path } = parse(req);
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (path === "/") {
    return NextResponse.next();
  } else if (
    !session?.email &&
    path !== "/login" &&
    path !== "/register" &&
    path !== "/"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (session?.email && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/todos", req.url));
  }
  //   return NextResponse.rewrite(new URL(`/app${path}`, req.url));
  return NextResponse.next();
}
