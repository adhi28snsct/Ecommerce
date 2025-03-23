"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Bellefair } from "next/font/google";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { createaccount } from "../../src/routes/signup";

const inter = Bellefair({
  weight: "400",
  subsets: ["latin"],
});

function SigninPage() {
  const [inputValue, setinputValue] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: "",
  });
  const { name, email, password, conpassword } = inputValue;

  const submithandler = () => {
    if (name !== "" && email !== "" && password !== "" && conpassword !== "") {
      if (password.length > 5 && conpassword.length > 5) {
        if (password === conpassword) {
          console.log(inputValue);
          createaccount(name, email, password,)
          setinputValue({
            name: "",
            email: "",
            password: "",
            conpassword: "",
          });
        } else {
          toast.error("Password does't match");
        }
      } else {
        toast.error("Password should be greater tan 8 letters");
      }
    } else {
      toast.error("all fields are mandsatory");
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex flex-row min-h-screen bg-slate-300 w-full justify-center ">
        <div className="absolute w-fit">
          <Image
            src={require("../../src/assests/bgimage.jpg")}
            className="w-full h-screen"
          />
        </div>
        <div className="flex md:flex-row flex-col md:items-center md:justify-center w-[100%] relative backdrop-blur-sm">
          <div className="flex md:flex-row flex-col  md:w-[70%] w-[100%] ">
            <div className="flex flex-row md:w-[50%] w-[100%] justify-center items-center">
              <Image
                src={require("../../src/assests/gallery img.png")}
                alt="images"
                className=" text-white w-64"
              />
            </div>
            <div className="flex flex-col gap-3 md:w-[50%] w-[100%]  justify-center items-center ">
              <div className={inter.className}>
                <span className="md:text-4xl text-2xl font-semibold">
                  Welcome Back to The Gallery
                </span>
              </div>
              <div className="flex flex-col gap-2 w-64 ">
                <div className="flex flex-col">
                  <label className="font-semibold">Name:</label>

                  <input
                    required
                    type="text"
                    className="outline-none px-2 py-1"
                    value={name}
                    onChange={(e) => {
                      setinputValue({ ...inputValue, name: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Email:</label>

                  <input
                    required
                    type="text"
                    className="outline-none px-2 py-1"
                    value={email}
                    onChange={(e) => {
                      setinputValue({ ...inputValue, email: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Password:</label>
                  <input
                    required
                    type="password"
                    className="outline-none px-2 py-1"
                    value={password}
                    onChange={(e) => {
                      setinputValue({
                        ...inputValue,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Confirm Password:</label>
                  <input
                    required
                    type="password"
                    className="outline-none px-2 py-1"
                    value={conpassword}
                    onChange={(e) => {
                      setinputValue({
                        ...inputValue,
                        conpassword: e.target.value,
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
                  Create Account
                </button>
              </div>
              <div className="flex flex-row gap-2">
                Already have account?{" "}
                <span>
                  <Link href="/" className="font-semibold">
                    Login
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

export default SigninPage;
