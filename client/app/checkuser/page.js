"use client";
import { jwt } from "@/src/envfile/api";
import React, { useEffect } from "react";
import Homepage from "../homepage/page";

function Checkuser() {
  const checkuserdata = async () => {
    try {
      await fetch(jwt + "/user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("Token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data === "Token-expired") {
            window.localStorage.clear;
            window.location.href = "/";
          }
        });
    } catch (error) {
      console.log(error, "user check");
    }
  };

  useEffect(() => {
    checkuserdata();
  }, []);

  return (
    <>
      <Homepage />
    </>
  );
}

export default Checkuser;
