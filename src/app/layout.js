
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SCHOOL Finder",
  description: " Discover nearby schools and contribute to our growing database by adding your own school. Find information, reviews, and ratings on educational institutions in your area. Join our community to empower others in making informed decisions about education.",
};



export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
