"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Bellefair } from "next/font/google";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { loginaccount } from "@/src/routes/login";

const inter = Bellefair({
  weight: "400",
  subsets: ["latin"],
});

function LoginPage() {
  const [inputValue, setinputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const submithandler = () => {
    if (email !== "" && password !== "") {
      console.log(inputValue);
      loginaccount(email, password);
      setinputValue({
        email: "",
        password: "",
      });
    } else {
      toast.error("all fields are mandsatory");
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex flex-row min-h-screen bg-slate-300 w-full justify-center ">
        <div className="absolute w-full">
          <Image
            src={require("../src/assests/bgimage.jpg")}
            className=" w-full h-screen"
            alt="images"
            priority={false}
          />
        </div>
        <div className="flex md:flex-row flex-col  items-center justify-center w-[100%] relative backdrop-blur-sm">
          <div className="flex md:flex-row flex-col  md:w-[70%] w-[100%]">
            <div className="flex flex-row md:w-[50%] w-[100%] justify-center items-center">
              <Image
                src={require("../src/assests/gallery img.png")}
                alt="images"
                className=" text-white w-64"
              />
            </div>
            <div className="flex flex-col gap-3 md:w-[50%] w-[100%]  justify-center items-center">
              <div className={inter.className}>
                <span className="md:text-4xl text-2xl  font-semibold">
                  Welcome Back to The Gallery
                </span>
              </div>
              <div className="flex flex-col gap-2 w-64">
                <div>
                  <label className="font-semibold ">Email:</label>

                  <input
                    required
                    type="text"
                    className="outline-none px-3 py-2 rounded-sm"
                    value={email}
                    onChange={(e) => {
                      setinputValue({ ...inputValue, email: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label className="font-semibold ">
                    Password:
                  </label>
                  <input
                    required
                    type="password"
                    className="outline-none px-3 py-2 rounded-sm"
                    value={password}
                    onChange={(e) => {
                      setinputValue({
                        ...inputValue,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <button
                  className="px-5 py-1 bg-zinc-900 text-white font-semibold rounded-sm"
                  onClick={submithandler}
                >
                  Login
                </button>
              </div>
              <div className="flex flex-row gap-2">
                Don't have account?{" "}
                <span>
                  <Link href="signinPage" className="font-semibold">
                    Signin
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
