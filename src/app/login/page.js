import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import LoginFormButton from "./loginformButton";
import { base_url,port } from "@/constant/constants";
async function getData(email, userPass) {
  "use server";

  const useremail = email;
  const userpassword = userPass;

  const usersDetails = await fetch(`${base_url+port}/api/users`, {
    cache: "no-cache",
  });

  const usersData = await usersDetails.json();
  const userData = usersData.find((row) => {
    return row.email === useremail && row.password === userpassword;
  });

  if (userData) {
  
    return userData;
  } else {
   
    return null;
  }
}

export default function LogIn() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b mb-6 bg-blue-400">
          <div className="flex items-center justify-center max-w-4xl mx-auto">
            <Link
              className="flex items-center space-x-2 text-white text-2xl font-bold"
              href="/"
            >
              School
            </Link>
          </div>
        </header>

        <div className="mt-8 flex-grow">
          <div className="flex flex-col justify-center items-center">
            <Card className=" w-full max-w-sm space-y-4 bg-blue-300">
              <CardHeader className="space-y-2 text-center">
                {/* <Image src="https://cdn-icons-png.freepik.com/256/2889/2889676.png" alt="" width={40} height={40}/> */}
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold">Login</CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account.
                  </CardDescription>
                </div>
              </CardHeader>
              <LoginFormButton getData={getData} />
            </Card>
          </div>
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
