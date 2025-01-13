import type { Metadata } from "next"; // Object to set metadata
import { Inter } from "next/font/google"; // You can change the font to anything you want.
import "@/src/styles/globals.css"; // Importing global styles
import localFont from "next/font/local"; // For local fonts
import Navbar from "@/src/components/navbar"; // Importing Navbar component


const inter = Inter({ subsets: ["latin"] });

// If you are experiencing an error "localFont is undefined", you might need to add the following blocks of code


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Camila's Personal Website",
  description: "A personal website for [name].",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
		// returns boilerplate
  return (
    <html lang="en">
      <body className={inter.className}>

      <Navbar/>
      {children}
      </body>
      
      
    </html>
  );
}


