"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { base_url,port } from "@/constant/constants"; 
export default function HomePage() {
  let [schools, setSchools] = useState([]);
  let [userData, setUserData] = useState("");
  let [schoolName, setSchoolName] = useState("");
  let [wholeSchoolsData, setWholeSchoolsData] = useState("");
  let router = useRouter();
  async function fetchSchoolDetails() {
    const schoolsDetails = await fetch(`${base_url+port}/api/schools`, {
      cache: "no-cache",
    });
    let schoolsData = await schoolsDetails.json();
   
    let localUserData = localStorage.getItem("userData");

    if (localUserData !== null) {
      localUserData = JSON.parse(localUserData);
      setUserData(localUserData);
    } else {
      setUserData(null);
    }
    setWholeSchoolsData(schoolsData);
    setSchools(schoolsData);
  }

  async function fetchData() {
    await fetchSchoolDetails();
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function gotToProfile() {
    router.push("/userProfile");
  }

  function searchSchool() {
    let formattedSearchedSchoolName = schoolName.trim().toLocaleLowerCase();
    let findSchoolData = schools.filter((row) => {
      let formattedSchoolName = row.schoolName.trim().toLocaleLowerCase();

      return formattedSearchedSchoolName === formattedSchoolName;
    });
    if (findSchoolData.length > 0) {
      setSchoolName("");
      setSchools(findSchoolData);
    } else {
      alert("School not found!!!!");
      setSchoolName("");
      setSchools(wholeSchoolsData);
      router.push("/");
    }
  }
  function addSchool() {
    router.push("/addSchool");
  }

  return (
    <>
      <main className="flex flex-col h-screen">
        <div className="flex flex-col h-screen justify-between">
          {userData ? (
            <header className="p-4 border-b bg-blue-400 flex h-25 ">
              <div className="flex items-center justify-center max-w-4xl mx-auto">
                <div className="flex items-center space-x-2 text-xs lg:text-3xl text-white font-bold ">
                  School
                </div>
              </div>
              {userData.schoolAdded ? (
                <div></div>
              ) : (
                <div className="flex mr-3">
                  <Button className="h-18" onClick={addSchool}>
                    Add School
                  </Button>
                  {/* <div className="mx-2 font-bold text-4xl">|</div>
                  <Button onClick={logOut}>LogOut</Button> */}
                </div>
              )}

              <div className="flex mr-3 ">
                <Button
                  className="rounded-full font-bold h-16 w-16 bg-white text-blue-500"
                  onClick={gotToProfile}
                >
                  Profile
                </Button>
                {/* <div className="mx-2 font-bold text-4xl">|</div>
                <Button onClick={logOut}>LogOut</Button> */}
              </div>
            </header>
          ) : (
            <header className="p-4 border-b bg-blue-400 flex ">
              <div className="flex items-center justify-center max-w-4xl mx-auto">
                <div className="flex items-center space-x-2  text-xl lg:text-3xl text-white font-bold  ">
                  School
                </div>
              </div>
              <div className="flex mt-2">
                <Link
                  href="/signUp"
                  className="font-bold text-xs lg:text-3xl text-white"
                >
                  Click If You want to add school
                </Link>
                <div className="mx-2 font-bold text-xs lg:text-3xl">|</div>
                <Link
                  href="/login"
                  className="font-bold text-xs lg:text-3xl text-white"
                >
                  LogIn
                </Link>
              </div>
            </header>
          )}

          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-16">
                <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10">
                  School Search
                </h1>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <Input
                    className="flex-1 "
                    placeholder="School Name..."
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                  <Button className="w-auto" id="search" onClick={searchSchool}>
                    Search
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {schools.map((row) => (
                    <div
                      className="flex flex-col items-center bg-white rounded-lg border shadow-md overflow-hidden"
                      key={row.schoolId}
                    >
                      <div className="h-40">
                        <Image
                        width="144"
                        height="40"
                          alt="School Image"
                         
                           src={`/schoolImages/${row.image.name}`}
                        />
                      </div>

                      <div className="p-4 w-full">
                        <h5 className="text-lg font-bold">{row.schoolName}</h5>
                        <p className="text-sm text-gray-500">
                          {row.schoolAddress}, {row.schoolCity}
                        </p>
                        <Button className="mt-3 w-full text-white">
                          Apply now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <Button className="w-auto">Next</Button>
                </div>
              </div>
            </div>
          </div>
          <footer className="bg-blue-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col">
                  <span className="font-bold text-lg mb-2">
                    Subscribe to our Newsletter
                  </span>
                  <div className="flex">
                    <Input
                      className="w-full"
                      placeholder="Enter email here..."
                    />
                    <Button className="w-auto">→</Button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg mb-2">
                    Important Links
                  </span>
                  <Link className="block" href="#">
                    Schools in India
                  </Link>
                  <Link className="block" href="#">
                    Other Schools in India
                  </Link>
                  <Link className="block" href="#">
                    Colleges in India
                  </Link>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg mb-2">Support</span>
                  <Link className="block" href="#">
                    Privacy Policy
                  </Link>
                  <Link className="block" href="#">
                    Terms and Conditions
                  </Link>
                  <Link className="block" href="#">
                    Refund Policy
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
