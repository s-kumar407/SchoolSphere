"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { base_url,port } from "@/constant/constants";
export default function AddSchool({ addSchoolDetails }) {
  let [schoolName, setSchoolName] = useState("");
  let [schoolAddress, setSchoolAddress] = useState("");
  let [schoolState, setSchoolState] = useState("");
  let [schoolCity, setSchoolCity] = useState("");
  let [schoolEmail, setSchoolEmail] = useState("");
  let [schoolContactNumber, setSchoolContactNumber] = useState("");
  let [schoolImage, setSchoolImage] = useState(null);
  let [schoolImageDataInString, setSchoolImageDataInString] = useState("");
  let router = useRouter();
  async function addSchool(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("schoolName", schoolName);
    formData.append("schoolAddress", schoolAddress);
    formData.append("schoolState", schoolState);
    formData.append("schoolCity", schoolCity);
    formData.append("schoolEmail", schoolEmail);
    formData.append("schoolContactNumber", schoolContactNumber);
    formData.append("schoolImage", schoolImage); // Append file object

    await addSchoolDetails(formData);

    let localUserData = localStorage.getItem("userData");
    localUserData = JSON.parse(localUserData);
    let userData = await fetch(
      `${base_url+port}/api/users/${localUserData.email}`,
      {
        cache: "no-cache",
      }
    );

    if (userData) {
      userData = await userData.json();
      let userId = userData.id;
      let presentSchoolDataInDatabase = await fetch(
        `${base_url+port}/api/schools`,
        {
          cache: "no-cache",
        }
      );
      presentSchoolDataInDatabase = await presentSchoolDataInDatabase.json();
      let addSchoolData = await fetch(`${base_url+port}/api/schools`, {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({
          schoolName,
          schoolAddress,
          schoolState,
          schoolCity,
          schoolEmail,
          schoolContactNumber,
          schoolImageDataInString,
          userId,
          presentSchoolDataInDatabase,
        }),
      });

      addSchoolData = await addSchoolData.json();
      if (addSchoolData.dataPresent) {
        alert(
          "SchoolData you provided aready present. Please check your school-Address, school-Email , school-ContactNumber"
        );
        setSchoolName("");
        setSchoolAddress("");
        setSchoolCity("");
        setSchoolState("");
        setSchoolContactNumber("");
        setSchoolEmail("");
        setSchoolImage();
        router.push("/addSchool");
      } else {
        let schoolAdded = localUserData.schoolAdded;
        schoolAdded = true;
        let email = localUserData.email;
        let name = localUserData.name;
        localStorage.setItem(
          "userData",
          JSON.stringify({ email, name, schoolAdded })
        );
        router.push("/");
      }
    } else {
      alert("something went wrong!!!");
      router.push("/");
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    let schoolData = {
      name: selectedFile.name,
      type: selectedFile.type,
      size: selectedFile.size,
      path: "public/schoolImages",
    };
    schoolData = JSON.stringify(schoolData);
    setSchoolImageDataInString(schoolData);
    setSchoolImage(selectedFile);
  };
  return (
    <>
      <div className="container mx-auto px-4">
        <Card className="w-full sm:max-w-md md:max-w-lg py-4">
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Add a new school</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter the school information below.
                </p>
              </div>
              <form onSubmit={addSchool}>
                <div className="my-1">
                  <Label htmlFor="school-name">School name</Label>
                  <Input
                    name="schoolName"
                    type="text"
                    placeholder="Enter the school name"
                    title="Enter the correct School Name"
                    pattern="[A-Za-z ]*"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    name="schoolAddress"
                    type="text"
                    placeholder="Enter the address"
                    // pattern="\d{1,5}\s\w. \s(\b\w*\b\s){1,2}\w*\"
                    title="Enter right Address"
                    value={schoolAddress}
                    onChange={(e) => setSchoolAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="city">City</Label>
                  <Input
                    name="schoolCity"
                    type="text"
                    placeholder="Enter the city"
                    title="Enter the correct School City"
                    pattern="[A-Za-z ]*"
                    value={schoolCity}
                    onChange={(e) => setSchoolCity(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="state">State</Label>
                  <Input
                    name="schoolState"
                    type="text"
                    placeholder="Enter the state"
                    title="Enter the correct School State"
                    pattern="[A-Za-z ]*"
                    value={schoolState}
                    onChange={(e) => setSchoolState(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="contact-number">Contact number</Label>
                  <Input
                    name="contactNumber"
                    placeholder="Enter the contact number"
                    type="text"
                    pattern="^\d{10}$"
                    title="fill only 10 digits"
                    value={schoolContactNumber}
                    onChange={(e) => setSchoolContactNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="schoolEmail"
                    type="email"
                    placeholder="Enter the email"
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    title="write valid email"
                    value={schoolEmail}
                    onChange={(e) => setSchoolEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    name="schoolImage"
                    type="file"
                    placeholder="Enter the image"
                    onChange={handleFileChange}
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <Button className="w-full mt-3" type="submit">
                  Save
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
