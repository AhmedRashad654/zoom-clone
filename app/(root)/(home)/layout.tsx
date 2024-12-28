import React, { ReactNode } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import Auth from "@/app/protectedRouted/Auth";

export default function layoutHome({ children }: { children: ReactNode }) {
  return (
    <Auth>
      <main>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className=" px-6 pb-6 pt-24 flex flex-col flex-1 sm:px-14 max-md:pb-14">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </main>
    </Auth>
  );
}
