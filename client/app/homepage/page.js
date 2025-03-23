"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modalpage from "./modalpage/page";
import { gallery } from "@/src/envfile/api";
import { Bellefair } from "next/font/google";
import { AiFillDelete, AiOutlineDownload, AiOutlineStar } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";

const inter = Bellefair({
  weight: "400",
  subsets: ["latin"],
});

const Homepage = () => {
  const [show, setShow] = useState(false);
  const [imgprev, setImgprev] = useState(false);
  const [imgData, setImgData] = useState({});
  const [fetchImages, setFetchImages] = useState([]);
  // const dispatch = useDispatch();
  const submithandle = () => {
    window.localStorage.clear;
    window.location.href = "/";
  };

  const collectImages = async () => {
    try {
      await fetch(gallery + "/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFetchImages(data.data);
        });
      // dispatch(getCollection(data));
    } catch (error) {
      console.log(error, "IMAGE FETCh ERROR");
    }
  };

  useEffect(() => {
    collectImages();
  }, [fetchImages]);

  const deleteImage = async (id) => {
    try {
      await fetch(gallery + `/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "deleted") {
            toast.success("Deleted");
          }
        });
    } catch (error) {
      console.log(error, "IMAGE DELETE ERROR");
    }
  };
  // const fetchCollection = useSelector((state) => state.tasks.fetchCollection);

  return (
    <>
      <Toaster />
      <div className="flex flex-col w-[100%] bg-slate-200 min-h-screen">
        <div className="flex flex-row gap-2  items-center bg-slate-300 w-full justify-between md:px-10 px-3">
          <div className="flex flex-row  items-center ">
            <Image
              src={require("../../src/assests/gallery img.png")}
              alt="images"
              className=" text-white md:w-48 md:h-28 w-32 h-20"
              priority={false}
            />
          </div>
          <div className="flex flex-row gap-x-3">
            <button
              className="bg-blue-400 px-3 py-1 rounded-lg font-semibold  text-white"
              onClick={() => {
                setShow(true);
              }}
            >
              Upload
            </button>
            {show && <Modalpage show={show} setShow={setShow} />}
            <button
              className="bg-blue-400 px-3 py-1 rounded-lg font-semibold text-white hover:bg-red-400  transition-all"
              onClick={submithandle}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4  gap-2">
          {fetchImages.map((element, id) => {
            return (
              <div
                key={id}
                className="p-3  m-2 gap-2 flex flex-col bg-slate-100"
              >
                <div className="flex flex-row w-full md:h-56 justify-center">
                  <img
                    src={element.image.url}
                    alt="images"
                    className=" "
                    cl="true"
                    onClick={() => {
                      const id = element._id;
                      console.log(id, "img prev");
                    }}
                  />
                </div>
                <div className="flex flex-row w-full justify-between">
                  <div className="px-3 py-1  flex flex-row rounded-md items-center gap-2">
                    <button className="text-sm  ">Add to Fav</button>
                    <div>
                      <AiOutlineStar />{" "}
                    </div>
                  </div>{" "}
                  <div className="px-3 py-1  flex flex-row rounded-md items-center gap-2">
                    <button className="text-sm  ">Download</button>
                    <div>
                      <AiOutlineDownload />{" "}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-1">
                    <div className="text-sm md:text-lg font-medium">Title:</div>
                    <div className="text-sm md:text-lg ">{element.imgname}</div>
                  </div>
                  <div className="flex flex-row gap-1">
                    <div className="text-sm md:text-lg font-medium">
                      Image Description:
                    </div>
                    <div className="text-sm md:text-lg ">{element.imgdesc}</div>
                  </div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>{element.image.created_at}</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      const id = element._id;
                      deleteImage(id);
                      console.log(id, "image id");
                    }}
                  >
                    <AiFillDelete className="text-xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
