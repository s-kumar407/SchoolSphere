import Link from "next/link";
import { writeFile } from "fs/promises";
import { join } from "path";

import AddSchool from "./addSchoolDetail";
export default function AddSchoolDetails() {
  async function addSchoolDetails(formData) {
    "use server";
    const schoolImage = formData.get("schoolImage");

    if (!schoolImage || !(schoolImage instanceof File)) {
      return;
    }

    // Decoding base64 string to binary data
    const fileContents = await schoolImage.arrayBuffer();
    const path = join(process.cwd(), "public/schoolImages", schoolImage.name);
    await writeFile(path, Buffer.from(fileContents));
  }
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b  w-full bg-blue-500">
          <div className="flex items-center justify-center max-w-4xl mx-auto">
            <Link
              className="flex items-center space-x-2 text-2xl font-bold text-white"
              href="/"
            >
              School
            </Link>
          </div>
        </header>

        <div className=" flex flex-col flex-grow  items-center">
          <div className="mt-6 flex flex-col items-center">
           
            <AddSchool addSchoolDetails={addSchoolDetails} />
          </div>
        </div>
        <footer className="p-4 border-t w-full bg-blue-500 text-white text-center">
          <div className="max-w-4xl mx-auto">
            © 2023 School. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
