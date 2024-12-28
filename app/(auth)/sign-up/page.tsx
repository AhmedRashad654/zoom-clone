"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/types";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<register>();

  async function onSubmit(data: register) {
    try {
      const result = await axios.post("/api/register", data);
      console.log(result);
      if (result.status === 201) {
        dispatch(setUser(result?.data?.user));
        router.push(`/`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data?.message);
      }
    }
  }
  return (
    <div className=" w-full h-screen relative">
      <form
        className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-login1 w-[350px] rounded-lg p-5 flex flex-col items-center gap-5 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4>Register</h4>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="p-2 border-none outline-none rounded-md"
            {...register("username", { required: "username is required" })}
          />
          {errors["username"] && (
            <p className="text-red-500 text-sm -mt-1">
              {errors["username"].message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="">Email address</label>
          <input
            type="email"
            className="p-2 border-none outline-none rounded-md"
            {...register("email", { required: "email is required" })}
          />
          {errors["email"] && (
            <p className="text-red-500 text-sm -mt-1">
              {errors["email"].message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="p-2 border-none outline-none rounded-md"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 6,
                message: "password min length 6 character",
              },
            })}
          />
          {errors["password"] && (
            <p className="text-red-500 text-sm -mt-1">
              {errors["password"].message}
            </p>
          )}
        </div>
        <button className="bg-blue-500 rounded-md text-white p-2 w-full">
          {isSubmitting ? "Loading..." : "Register"}
        </button>
        <h6 className="text-[0.8rem]">
          Already registered?{" "}
          <Link className="text-white" href={"/sign-in"}>
            Login
          </Link>
        </h6>
      </form>
    </div>
  );
}
