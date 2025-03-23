import { gallery } from "../envfile/api";

export const createGallery = async (imgname, imgdesc, uploadimg) => {
  try {
    await fetch(gallery + "/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        imgname,
        imgdesc,
        image: uploadimg,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  } catch (error) {
    console.log(error, "GALLERY POST ERROR");
  }
};
