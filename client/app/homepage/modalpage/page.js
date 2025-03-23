"use client";
import { createGallery } from "@/src/routes/actions";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { GrFormClose } from "react-icons/gr";

function Modalpage({ show, setShow }) {
  const [uploadimg, setUploadimg] = useState("");
  const [inputvalue, setInputvalue] = useState({ imgname: "", imgdesc: "" });
  const { imgname, imgdesc } = inputvalue;

  const imageupload = (e) => {
    const file = e.target.files[0];
    transformfile(file);
  };

  const transformfile = (file) => {
    const reader = new FileReader(file);
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUploadimg(reader.result);
      };
    } else {
      setUploadimg("");
    }
  };

  const handleSubmit = () => {
    if (imgname !== "" && imgdesc !== "") {
      setInputvalue({
        imgname: "",
        imgdesc: "",
      });

      createGallery(imgname, imgdesc, uploadimg);
      toast.success("Successfully uploaded");
      console.log(inputvalue, "IMAGE DATA");
      console.log(uploadimg, "IMAGE DATA");

    } else {
      toast.error("All fields are mandatory");
    }
  };
  return (
    <>
      <div>
        <Toaster />
        <Modal open={show}>
          <div className="backdrop-blur-sm w-full h-screen flex flex-row md:items-center md:justify-center">
            <div className=" justify-center flex flex-col gap-3 w-[100%] md:w-[45%] ">
              <div
                className="flex flex-row items-end justify-end p-3 md:pr-0 pr-10 cursor-pointer"
                onClick={() => {
                  setShow(false);
                }}
              >
                <GrFormClose className="text-4xl md:text-4xl text-blue-400 " />
              </div>
              <div className="flex flex-col gap-3 justify-center w-full items-center ">
                <input
                  type="text"
                  placeholder="Image name"
                  className="px-3 py-2 outline-none w-[50%] rounded text-sm"
                  value={imgname}
                  onChange={(e) => {
                    setInputvalue({ ...inputvalue, imgname: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="px-3 py-2 outline-none w-[50%] rounded text-sm"
                  value={imgdesc}
                  onChange={(e) => {
                    setInputvalue({ ...inputvalue, imgdesc: e.target.value });
                  }}
                />
                <input
                  type="file"
                  placeholder="Image name"
                  accept="image/*"
                  className="px-3 py-1 outline-none w-[50%] rounded"
                  onChange={imageupload}
                />
                <div className="text-gray-400 text-sm">
                  *Image size maximun 2MB
                </div>
              </div>
              <div className="flex flex-row w-full justify-center">
                <button
                  className="px-5 py-1 rounded-sm bg-zinc-800 text-white"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Modalpage;
