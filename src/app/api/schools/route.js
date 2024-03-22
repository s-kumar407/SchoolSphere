import { NextResponse } from "next/server";
import prisma from "@/database/db";
export async function GET(request) {
  const schoolDetails = await prisma.schools.findMany();
  let schoolData = schoolDetails.map((row) => {
    row.image = JSON.parse(row.image);
    return row;
  });

  return NextResponse.json(
    schoolData,
    schoolData != undefined
      ? { status: 200, result: "school details fetched successfully" }
      : { status: 400, result: "data not found" }
  );
}

export async function POST(request) {
  let payload = await request.json();
  let userId = parseInt(payload.userId);
  let schoolImage = payload.schoolImageDataInString;

  let presentSchoolDataInDatabase = payload.presentSchoolDataInDatabase;
  let dataPresent = presentSchoolDataInDatabase.some((row) => {
    return (
      row.schoolAddress === payload.schoolAddress ||
      row.contactNo === payload.schoolContactNumber ||
      row.schoolEmail === payload.schoolEmail
    );
  });
  if (dataPresent) {
    return NextResponse.json({ dataPresent: true });
  } else {
    const schools = await prisma.schools.create({
      data: {
        schoolName: payload.schoolName,
        schoolAddress: payload.schoolAddress,
        schoolCity: payload.schoolCity,
        schoolState: payload.schoolState,
        contactNo: payload.schoolContactNumber,
        schoolEmail: payload.schoolEmail,
        image: schoolImage,
        userId: userId,
      },
    });

    if (schools) {
   
      const record = await prisma.users.findUnique({
        where: { id: userId },
      });

      if (!record) {
        throw new Error("Record not found");
      }

      // Update the specific column with the new value
      const updatedRecord = await prisma.users.update({
        where: { id: userId },
        data: {
          schoolId: schools.schoolId, // Update columnName with your actual column name
        },
      });
    }

    return NextResponse.json(schools, { result: "OK" });
  }
}

export async function PUT(request) {
  let payload = await request.json();
  let schoolid = payload.schoolId;
  schoolid = parseInt(schoolid);
  const updatedSchool = await prisma.schools.update({
    where: {
      schoolId: schoolid,
    },
    data: {
      schoolName: payload.schoolName,
      schoolAddress: payload.schoolAddress,
      schoolState: payload.schoolState,
      schoolCity: payload.schoolCity,
      schoolEmail: payload.schoolEmail,
      contactNo: payload.schoolContactNumber,
    },
  });
  if (updatedSchool) {
   
    return NextResponse.json(updatedSchool);
  } else {
    return NextResponse.json({ status: 400 });
  }
}
