import { NextResponse } from "next/server";
import prisma from "@/database/db";
export async function GET() {
  const users = await prisma.users.findMany();

  return NextResponse.json(users, {
    status: 201,
    result: "user details fetched SuccessFully!!!",
  });
}

export async function POST(request) {
  let payload = await request.json();

  let usersData = payload.usersData;


  let dataPresent = usersData.some((row) => {
    return (
      row.username === payload.username ||
      row.email === payload.useremail ||
      row.contactNo === payload.userContactNo ||
      row.password === payload.userpassword
    );
  });

  if (dataPresent) {
    return NextResponse.json({ dataPresent: true });
  } else {
    const userData = await prisma.users.create({
      data: {
        username: payload.username,
        email: payload.useremail,
        name: payload.name,
        contactNo: payload.userContactNo,
        password: payload.userpassword,
      },
    });
    if (userData) {
      return NextResponse.json(userData, {
        message: "user created successfully",
      });
    } else {
      return NextResponse.json({ message: "something went wrong!!!" });
    }
  }
}
export async function PUT(request, content) {
  let newUser = await request.json();
  let userId=newUser.userId;
  const updatedUser = await prisma.users.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      username: newUser.username,
      email: newUser.useremail,
      name: newUser.name,
      contactNo: newUser.userContactNo,
      password: newUser.userpassword,
    },
  });
  if(updatedUser){
    return NextResponse.json(newUser);
  }
  else{
    return NextResponse.json({status:400});
  }

}
