"use client"

import animationData from "./landing.json";
import React, { useEffect, useRef} from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { ArrowRightIcon } from "lucide-react";

const MyLottieComponent = () => {
  const animationRef = useRef(null);

  async function getLottie() {
    const lot = await import("lottie-web");

    lot.default.loadAnimation({
      autoplay: true,
      loop: true,
      animationData,
      container: animationRef.current!
    })

  }

  useEffect(() => {

    getLottie();

  }, []);



  return (
    <>
      <div className="">
        <div className="w-full h-full" ref={animationRef!}></div>
      </div>
    </>
  );
};


export default function Home() {

  return (
    <main className="w-[100vw] h-[100vh] flex flex-col items-center justify-center no-scrollbar">
      <div className="w-full">
        <Header stripped={true} page = {"landing"} />
      </div>
      <div className="flex h-full w-full md:px-16 px-2 md:flex-row flex-col-reverse">
        <div className="md:w-[50%] w-full md:h-full h-[50%] flex flex-col md:items-start items-center justify-center md:space-y-6">
          <p className="font-extrabold text-[#1da1f2] md:text-3xl text-2xl">Prelo.</p>
          <p className="font-extrabold text-[#000] md:text-6xl text-3xl md:text-start text-center">Unmatched Productivity At The Palm Of Your Hand...</p>
          <Link href={"/home"} className="cursor-pointer md:w-[10rem] w-[7rem] md:h-[3rem] h-[2rem] bg-[#1da1f2] text-white md:rounded-lg rounded-sm font-bold flex items-center justify-center mt-6 md:text-normal text-sm">
            <p>Continue</p>
            <ArrowRightIcon className="md:size-6 size-4 text-white mx-2" />
          </Link>
        </div>
        <div className="md:w-[50%] w-full md:h-full h-[50%] flex items-center justify-center">
          <MyLottieComponent />
        </div>
      </div>
    </main>
  );
}
