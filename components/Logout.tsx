"use client";
import { RootState } from "@/app/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Logout() {
  const user = useSelector((state: RootState) => state?.user);
  return (
    <Avatar>
      <AvatarFallback>
        {user?.username?.slice(0, 1).toUpperCase()}
        {user?.username?.slice(1, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
