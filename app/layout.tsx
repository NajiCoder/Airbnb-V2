import "./globals.css";

import { Inter } from "next/font/google";

import ToasterProvider from "./providers/ToasterProvider";

import Navbar from "./components/navbar/Navbar";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";
import SearchModal from "./components/modals/SearchModal";
import RegisterModal from "./components/modals/RegisterModal";

import { getCurrentUser } from "./actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
