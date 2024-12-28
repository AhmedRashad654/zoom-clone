"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Auth({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state?.user);
  const router = useRouter();

  useEffect(() => {
    if (!user?._id) {
      router.push("/sign-in");
    }
  }, [user?._id, router]);

  return user?._id ? children : null;
}
