import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { parse } from "@/lib/middleware/utils";

export default async function ApiMiddleware(req: NextRequest) {
  const { path, key, domain } = parse(req);
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return NextResponse.next();
}
