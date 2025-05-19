"use client"

// import { ArrowLeftCircle } from "lucide-react";
import animationData from "./lottie_create.json";
import { useLottie } from "lottie-react";
import { ArrowLeftCircle } from "lucide-react";
// import { } from "lottie-web";
import dynamic from 'next/dynamic';
import { useRef, useEffect } from "react";

const MyLottieComponent = () => {
  // let animationRef = useRef<AnimationConfigWithPath<"svg"> | AnimationConfigWithData<"svg">>();
  let animationRef = useRef<any>(null);

  async function getLottie() {
    const lot = await import("lottie-web");

    lot.default.loadAnimation({
      autoplay: true,
      loop: true,
      animationData,
      container: animationRef.current
    })

  }

  useEffect(() => {

    getLottie();

  }, []);

  return (
    <>
      <div className="">
        <div className="w-full" ref={animationRef!}></div>
      </div>
    </>
  );
};


export default function Home() {


  return (
    // <main className="flex space-x-2 items-center justify-start mt-20 h-full flex-col no-scrollbar">
    //   <MyLottieComponent />
    //   <div className="flex flex-col items-center justify-around text-center">
    //     <p className="font-extrabold text-lg text-[#1da1f2] ">Hello there!</p>
    //     <p className="font-medium text-[#000000be]">Check the sidebar to begin creating or collaborating...</p>
    //   </div>
    // </main>
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-12 h-12" />
      <h1 className="font-bold">Get started with creating a new document</h1>
    </main>
  );
}
