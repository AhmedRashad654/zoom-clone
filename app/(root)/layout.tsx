import StreamVideoProvider from "@/providers/StreamVideoProvider";
import React, { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </div>
  );
}
