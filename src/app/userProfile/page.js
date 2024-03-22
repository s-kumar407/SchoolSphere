"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { base_url,port } from "@/constant/constants";
export default function Component() {
  let router = useRouter();
  let [data, setData] = useState();
  let [username, setUserName] = useState("");
  let [useremail, setUserEmail] = useState("");
  let [name, setName] = useState("");
  let [userContactNo, setUserContactNo] = useState("");
  let [userpassword, setUserPassword] = useState("");
  let [isEditing, setIsEditing] = useState(false);
  let [showPassword, setShowPassword] = useState(false);
  let [inputType, setInputType] = useState("password");
  let [schoolAdded, setSchoolAdded] = useState(false);
  useEffect(() => {
    userProfileData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  async function userProfileData() {
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
      if (userData.schoolId) {
        setSchoolAdded(true);
      }
      setData(userData);
      setUserName(userData.username);
      setUserEmail(userData.email);
      setName(userData.name);
      setUserContactNo(userData.contactNo);
      setUserPassword(userData.password);
    } else {
      alert("somthing went wrong");
      router.push("/");
    }
  }

  function logOut() {
    localStorage.removeItem("userData");
    router.push("/");
  }
  const handleEditProfile = () => {
    setIsEditing(true); // Enable editing
  };

  const handleSaveProfile = async () => {
    let userId = data.id;
    const updateUser = await fetch(`${base_url+port}/api/users`, {
      method: "PUT",
      cache: "no-cache",
      body: JSON.stringify({
        username,
        useremail,
        name,
        userContactNo,
        userpassword,
        userId,
      }),
    });
    if (updateUser) {
      alert("User Updated!!!");
      setIsEditing(false);
      router.push("/userProfile");
    } else {
      alert("something went wrong!!!");
    }
    // Disable editing
  };
  function showPass() {
    setInputType("text");
    setShowPassword(true);
  }
  function hidePass() {
    setInputType("password");
    setShowPassword(false);
  }

  function viewSchoolDetails() {
    let localUserData = localStorage.getItem("userData");
    localUserData = JSON.parse(localUserData);
    if (localUserData.schoolAdded) {
      router.push("/schoolProfile");
    }
  }
  function addSchool() {
    router.push("/addSchool");
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className=" p-4 border-b flex bg-blue-400 h-20 justify-center items-center">
          <div className=" max-w-4xl mx-auto">
            <Link
              className="flex items-center space-x-2 text-3xl text-white font-bold"
              href="/"
            >
              School
            </Link>
          </div>
          <div>
            <Button onClick={logOut}>LogOut</Button>
          </div>
        </header>
        <main className="flex-1">
        <div className="flex flex-col items-center justify-center mt-16">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>{name.toUpperCase()}</CardTitle>
              <CardDescription>your profile information. </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">User-Name</Label>
                {data ? (
                  <Input
                    type="text"
                    value={username}
                    id="username"
                    pattern= "[A-Za-z0-9]*"
                    title="Please choose first letter of username as alphabet"
                    onChange={(e) => setUserName(e.target.value)}
                    readOnly={!isEditing}
                  />
                ) : (
                  <p>Data not found</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">User-Email</Label>
                {data ? (
                  <Input
                    type="text"
                    value={useremail}
                    id="useremail"
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    title="write valid email"
                    onChange={(e) => setUserEmail(e.target.value)}
                    readOnly={!isEditing}
                  />
                ) : (
                  <p>Data not found</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                {data ? (
                  <Input
                    type="text"
                    value={name}
                    id="name"
                    title="Please only enter alphabets"
                    pattern="[A-Za-z ]*"
                    onChange={(e) => setName(e.target.value)}
                    readOnly={!isEditing}
                  />
                ) : (
                  <p>Data not found</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contact-Number</Label>
                {data ? (
                  <Input
                    type="text"
                    value={userContactNo}
                    id="contactNo"
                    pattern="^\d{10}$"
                    title="fill only 10 digits"
                    onChange={(e) => setUserContactNo(e.target.value)}
                    readOnly={!isEditing}
                  />
                ) : (
                  <p>Data not found</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                {data ? (
                  <>
                    <Input
                      type={inputType}
                      value={userpassword}
                      id="password"
                      pattern=".{8,}"
                      title="Eight or more characters"
                      onChange={(e) => setUserPassword(e.target.value)}
                      readOnly={!isEditing}
                    />
                    {showPassword ? (
                      <Button onClick={hidePass}>Hide</Button>
                    ) : (
                      <Button onClick={showPass}>Show</Button>
                    )}
                  </>
                ) : (
                  <p>Data not found</p>
                )}
              </div>

              {/* <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            className="min-h-[100px]"
            id="bio"
            placeholder="Enter your bio"
            value="I&apos;m a user on this website."
          />
        </div> */}
            </CardContent>
            <CardFooter className="flex flex-col my-1">
              {isEditing ? (
                <div></div>
              ) : (
                <div className="text-red-500 my-1">
                  If you want to update information please click on edit profile
                  button!!!
                </div>
              )}
              {isEditing ? (
                <Button onClick={handleSaveProfile}>Save Profile</Button>
              ) : (
                <Button onClick={handleEditProfile}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>
          {schoolAdded ? (
            <>
              <div className="m-10 h-24 w-full max-w-3xl border-2 border-double  flex flex-col justify-center items-center">
                <p className="text-red-500 my-1">
                  If you want to see your school details. Please click on view
                  school button!!!
                </p>
                <div className="m-2">
                  <Button onClick={viewSchoolDetails}>View School</Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="m-10 h-24 w-full max-w-3xl border-2 border-double  flex flex-col justify-center items-center">
                <p className="text-red-500 my-1">
                  You have not add school yet . Please add School first!!
                </p>
                <div className="m-2">
                  <Button onClick={addSchool}>Add School</Button>
                </div>
              </div>
            </>
          )}
        </div>
        </main>
        <footer className=" border-t bg-blue-400 h-12">
          <div className="max-w-4xl mx-auto text-center font-bold  text-sm text-slate-600 dark:text-gray-400 pt-3">
            © 2023 School. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
