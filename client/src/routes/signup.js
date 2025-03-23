import { toast } from "react-hot-toast";
import { jwt } from "../envfile/api";

export const createaccount = async (name, email, password) => {
  try {
    await fetch(jwt + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "registered");
        if (data.status === "ok") {
          toast.success("Added");
        }
      });
  } catch (error) {
    console.log(error, "USER POST ERROR");
  }
};
