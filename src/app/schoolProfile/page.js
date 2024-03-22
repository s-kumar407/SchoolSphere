"use client";
import {
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { base_url, port } from "@/constant/constants";

export default function Component() {
  let [isEditing, setIsEditing] = useState(false);
  let [data, setData] = useState("");
  let [schoolName, setSchoolName] = useState("");
  let [schoolAddress, setSchoolAddress] = useState("");
  let [schoolState, setSchoolState] = useState("");
  let [schoolCity, setSchoolCity] = useState("");
  let [schoolEmail, setSchoolEmail] = useState("");
  let [schoolContactNumber, setSchoolContactNumber] = useState("");
  let [schoolImage, setSchoolImage] = useState();
  let [schoolImageName, setSchoolImageName] = useState();
  let router = useRouter();
  useEffect(() => {
    schoolProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function schoolProfileData() {
    let localUserData = localStorage.getItem("userData");
    localUserData = JSON.parse(localUserData);

    let userData = await fetch(
      `${base_url + port}/api/users/${localUserData.email}`,
      {
        cache: "no-cache",
      }
    );
    userData = await userData.json();
    let schoolid = userData.schoolId;
    let schoolData = await fetch(`${base_url + port}/api/schools/${schoolid}`, {
      cache: "no-cache",
    });

    if (schoolData) {
      schoolData = await schoolData.json();
      setData(schoolData);
      setSchoolName(schoolData.schoolName);
      setSchoolEmail(schoolData.schoolEmail);
      setSchoolCity(schoolData.schoolCity);
      setSchoolState(schoolData.schoolState);
      setSchoolContactNumber(schoolData.contactNo);
      setSchoolAddress(schoolData.schoolAddress);
      let image = JSON.parse(schoolData.image);
      setSchoolImageName(image.name);
      setSchoolImage(image);
    } else {
      alert("somthing went wrong");
      router.push("/");
    }
  }

  function handleEditSchoolProfile() {
    setIsEditing(true);
  }
  async function handleSaveSchoolProfile() {
    let schoolId = data.schoolId;

    let updateSchoolData = await fetch(`${base_url + port}/api/schools`, {
      method: "PUT",
      cache: "no-cache",
      body: JSON.stringify({
        schoolId,
        schoolName,
        schoolAddress,
        schoolCity,
        schoolState,
        schoolEmail,
        schoolContactNumber,
      }),
    });
    if (updateSchoolData) {
      updateSchoolData = await updateSchoolData.json();
      alert("School Updated!!!");
      setIsEditing(false);
      router.push("/schoolProfile");
    } else {
      alert("Something went wrong!!. Please try again");
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-blue-400 sticky top-0 z-10">
          <div className="flex items-center justify-center max-w-4xl mx-auto">
            <Link
              className="flex items-center space-x-2 text-3xl lg:text-4xl text-white font-bold"
              href="/"
            >
              School
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 flex-grow">
          <Card className="w-full sm:max-w-md mx-auto mt-10 mb-10">
            <CardHeader>
              <div className="font-bold">{schoolName.toUpperCase()}</div>
              <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {schoolAddress.toUpperCase()}
              </p>
            </CardHeader>
            <CardContent className="flex">
              <div className="grid gap-6 w-full">
                <div className="grid gap-2">
                  <Label htmlFor="school-image">School Image</Label>

                  {data ? (
                    <div className="flex items-center justify-center h-40 border-2 border-double bg-gray-200 dark:bg-gray-700 rounded-lg">
                      <Image
                        alt="School Image"
                        height="40"
                        width="144"
                        src={`/schoolImages/${schoolImageName}`}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-40 border-2 border-double bg-gray-200 dark:bg-gray-700 rounded-lg">
                      <Image
                        alt="School Image not found"
                        height="40"
                        width="144"
                        src={""}
                      />
                    </div>
                  )}
                </div>
            
                <div className="grid gap-2">
                  <Label htmlFor="school-name">School Name</Label>
                  {data ? (
                    <Input
                      id="school-name"
                      value={schoolName}
                      pattern="[A-Za-z ]*"
                      onChange={(e) => setSchoolName(e.target.value)}
                      readOnly={!isEditing}
                      required
                    />
                  ) : (
                    <p>Data not found</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  {data ? (
                    <Input
                      id="adress"
                      value={schoolAddress}
                      onChange={(e) => setSchoolAddress(e.target.value)}
                      readOnly={!isEditing}
                      required
                    />
                  ) : (
                    <p>Data not found</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="grid gap-2 md:flex md:items-center">
                    <div className="w-full grid gap-1">
                      <Label htmlFor="city">City</Label>
                      {data ? (
                        <Input
                          id="city"
                          value={schoolCity}
                          pattern="[A-Za-z ]*"
                          onChange={(e) => setSchoolCity(e.target.value)}
                          readOnly={!isEditing}
                          required
                        />
                      ) : (
                        <p>Data not found</p>
                      )}
                    </div>
                    <div className="w-full grid gap-1">
                      <Label htmlFor="state">State</Label>
                      {data ? (
                        <Input
                          id="state"
                          value={schoolState}
                          pattern="[A-Za-z ]*"
                          onChange={(e) => setSchoolState(e.target.value)}
                          readOnly={!isEditing}
                          required
                        />
                      ) : (
                        <p>Data not found</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  {data ? (
                    <Input
                      id="email"
                      value={schoolEmail}
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      title="Please fill right email"
                      onChange={(e) => setSchoolEmail(e.target.value)}
                      readOnly={!isEditing}
                      required
                    />
                  ) : (
                    <p>Data not found</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-number">Contact Number</Label>
                  {data ? (
                    <Input
                      id="contact-number"
                      placeholder="Enter the school name"
                      pattern="^\d{10}$"
                      title="fill only 10 digits"
                      value={schoolContactNumber}
                      onChange={(e) => setSchoolContactNumber(e.target.value)}
                      readOnly={!isEditing}
                      required
                    />
                  ) : (
                    <p>Data not found</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col my-1 text-center">
              {isEditing ? (
                <div></div>
              ) : (
                <div className="text-red-500 my-1">
                  If you want to update information please click on edit school
                  profile button!!!
                </div>
              )}
              {isEditing ? (
                <Button onClick={handleSaveSchoolProfile}>
                  Save School Profile
                </Button>
              ) : (
                <Button onClick={handleEditSchoolProfile}>
                  Edit School Profile
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        <footer className="border-t p-4 bg-blue-400 ">
          <div className="max-w-4xl mx-auto text-center font-bold  text-sm text-slate-600 dark:text-gray-400">
            © 2023 School. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
