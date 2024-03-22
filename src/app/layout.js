
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SCHOOL Finder",
  description: " Discover nearby schools and contribute to our growing database by adding your own school. Find information, reviews, and ratings on educational institutions in your area. Join our community to empower others in making informed decisions about education.",
};



export default function RootLayout({ children }) {
  return (
     <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
