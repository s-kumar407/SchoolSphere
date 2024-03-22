"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginFormButton({ getData }) {
  let [email, setUserEmail] = useState("");
  let [userPass, setUserPass] = useState("");

  const router = useRouter();

  async function removeData(e) {
    e.preventDefault();
    const userData = await getData(email, userPass);
    if (userData) {
   
      if (userData.schoolId) {
        let schoolAdded = true;
        let name = userData.name;
        localStorage.setItem("userData", JSON.stringify({email, name, schoolAdded }));
      } else {
        let schoolAdded = false;
        let name = userData.name;
        localStorage.setItem("userData", JSON.stringify({email, name, schoolAdded }));
      }

      router.push("/");
    } else {
      alert("Please provide right credentials!!!");
      setUserEmail("");
      setUserPass("");
      router.push("/login");
    }
  }

  return (
    <>
      <form onSubmit={removeData}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="useremail"
              placeholder="m@example.com"
              required
              type="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              title="Please fill right email for log in"
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="userpassword"
              required
              type="password"
              title="Please fill right password for log in"
              value={userPass}
              onChange={(e) => setUserPass(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="space-y-4">
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
