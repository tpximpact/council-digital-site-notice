import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return new NextResponse("Status ok", { status: 200 });
}
