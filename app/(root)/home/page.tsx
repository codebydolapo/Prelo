"use client"

import animationData from "./lottie_create.json";
import { useRef, useEffect } from "react";
import Image from "next/image";

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
      <div className="w-[25rem] h-[25rem] flex items-center justify-center rounded-full relative">
        <div className="w-full z-10" ref={animationRef!}></div>
        <Image alt="" src="/vector.svg" width={0} height={0} className='w-full h-full absolute self-center tint-gray-300' />
      </div>
    </>
  );
};


export default function HomePage() {


  return (
    <main className="flex space-x-2 items-center justify-start pt-20 flex-col no-scrollbar">
      <MyLottieComponent />
      <div className="flex flex-col items-center justify-around text-center space-y-3">
        <p className="font-extrabold text-3xl text-[#1da1f2] ">Hello there!</p>
        <p className="font-medium text-[#000000be]">Check the sidebar to begin creating or collaborating...</p>
      </div>
    </main>
  );
}
