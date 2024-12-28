import Image from "next/image";
import React from "react";
import Yoom from "../public/icons/logo.svg";
import Link from "next/link";
import MobileNav from "./MobileNav";
import Logout from "./Logout";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-3 lg:px-9">
      <Link href="/" className="flex items-center gap-1">
        <Image src={Yoom} width={32} height={32} alt="yoom logo" />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          YOOM
        </p>
      </Link>
      <div className="flex flex-between gap-5">
        <MobileNav />
        <Logout />
      </div>
    </nav>
  );
}
