"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { base_url,port } from "@/constant/constants";
export default function SignUp() {
  let [username, setUserName] = useState("");
  let [useremail, setUserEmail] = useState("");
  let [name, setName] = useState("");
  let [userContactNo, setUserContactNo] = useState("");
  let [userpassword, setUserPassword] = useState("");
  let router = useRouter();
  async function retrieveFormData(e) {
    e.preventDefault();
    let usersData = await fetch(`${base_url+port}/api/users`);
    usersData = await usersData.json();

    let response = await fetch(`${base_url+port}/api/users`, {
      method: "POST",
      body: JSON.stringify({
        username,
        useremail,
        name,
        userContactNo,
        userpassword,
        usersData,
      }),
    });
    let respJson=await response.json();

      
    if (respJson.dataPresent) {
      alert("Data you provided already present . Please login!! OR  Check your user-name, user-email, contact-Number, password for SignUp!!!");
      setUserName("");
      setUserEmail("");
      setName("");
      setUserContactNo("");
      setUserPassword("");
    } else {
      let responseData=respJson;
      delete responseData.id
      delete responseData.password;
      delete responseData.contactNo;
      delete responseData.role;
      delete responseData.schoolId;
      delete responseData.username
      responseData.schoolAdded=false;
      localStorage.setItem("userData", JSON.stringify(responseData));
      router.push("/");
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-blue-400">
          <div className="flex items-center justify-center max-w-4xl mx-auto">
            <Link
              className="flex items-center space-x-2 text-3xl text-white font-bold"
              href="/"
            >
              School
            </Link>
          </div>
        </header>
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 ">
          <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
            <div className="grid gap-4 p-4 rounded-lg bg-blue-300 shadow-lg max-w-md lg:max-w-sm w-full dark:bg-gray-900">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl lg:text-3xl font-bold text-black py-2">Signup</h1>
                <p className="text-base lg:text-lg text-slate-500 font-bold">
                  If you want to add a school First create an account{" "}
                </p>
              </div>
              <div className="space-y-4">
                <form onSubmit={retrieveFormData}>
                  <div className="py-2">
                    <label className="text-slate-600 font-bold">Username</label>
                    <Input
                      name="username"
                      placeholder="Enter your username"
                      type="text"
                     pattern= "[A-Za-z0-9]*"
                     title="Please choose first letter of username as alphabet"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="py-2">
                    <label className="text-slate-600 font-bold">Email</label>
                    <Input
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      title="write valid email"
                      value={useremail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="py-2">
                    <label className="text-slate-600 font-bold">Name</label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      title="Please only enter alphabets"
                      pattern="[A-Za-z ]*"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="py-2">
                    <label className="text-slate-600 font-bold">
                      Phone Number
                    </label>
                    <Input
                      name="contactNumber"
                      type="text"
                      placeholder="Enter your phone number"
                      pattern="^\d{10}$"
                      title="fill only 10 digits"
                      value={userContactNo}
                      onChange={(e) => setUserContactNo(e.target.value)}
                      required
                    />
                  </div>
                  <div className="py-2">
                    <label className="text-slate-600 font-bold">Password</label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      pattern=".{8,}"
                      title="Eight or more characters"
                      value={userpassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button className="w-full mt-3" type="submit">
                    Sign Up
                  </Button>
                </form>
                {/* <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password"  type="password" required />
              </div> */}
              </div>
              <div className="text-center">
                <p className="text-base lg:text-lg">Already Have an account?</p>
                <Link className="font-medium" href="/login">
                  <span className="text-slate-800 font-bold text-lg">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="border-t p-4 bg-blue-400 ">
          <div className="max-w-4xl mx-auto text-center font-bold  text-sm text-slate-600 dark:text-gray-400">
            © 2023 School. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
