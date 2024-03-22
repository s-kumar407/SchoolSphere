import { NextResponse } from "next/server";
import prisma from "@/database/db";
export async function GET(request, content) {
  let useremail = content.params.email;
  let user = await prisma.users.findFirst({
    where: { email: useremail },
  });
  return NextResponse.json(user);
}
