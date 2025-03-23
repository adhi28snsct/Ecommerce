import { toast } from "react-hot-toast";
import { jwt } from "../envfile/api";

export const loginaccount = async (email, password) => {
  try {
    await fetch(jwt + "/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data, "logined successfully");
        if (data.status === "ok") {
          toast.success("logined successfully");
        }
        window.localStorage.setItem("Token", data.data);
        window.location.href = "/checkuser";
      });
  } catch (error) {
    console.log(error, "ACCOUNT LOGIN ERROR");
  }
};
