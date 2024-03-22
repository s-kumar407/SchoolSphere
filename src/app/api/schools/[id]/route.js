import { NextResponse } from "next/server";
import prisma from "@/database/db";
export async function GET(request, content) {
  let schoolid = content.params.id;
  schoolid = parseInt(schoolid);
  let school = await prisma.schools.findUnique({ where: { schoolId: schoolid } });
  return NextResponse.json(school);
}
