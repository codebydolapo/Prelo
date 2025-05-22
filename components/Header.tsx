"use client"

import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
// import Breadcrumbs from './Breadcrumbs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


function Header({ stripped, page }: { stripped: boolean, page: string }) {
    const { user } = useUser()

    const pathName = usePathname()


    return (
        <div className={`flex items-center justify-between ${stripped ? "bg-white" : "bg-black"} md:px-5 xs:px-3 py-3`}>
            {page !== "landing"
                ?
                <div className='flex items-center justify-between w-full md:px-0 px-2'>
                    {
                        user
                            ?
                            <div className='flex space-x-2 items-center justify-center'>
                                <Link href="/">
                                    <Image alt="" src="/icons/prelo_logo.jpg" width={0} height={0} className='rounded-full size-8' />
                                </Link>
                                <div className=''>
                                    <h1 className='text-xs capitalize text-white font-semibold'>Hello,</h1>
                                    <h1 className='md:text-xl capitalize text-[#1DA1F2] font-extrabold tracking-wider'>{`${user?.firstName}`}</h1>
                                </div>
                            </div>
                            :
                            <div className='flex space-x-2'>
                                <Link href="/">
                                    <Image alt="" src="/icons/prelo_logo.jpg" width={45} height={45} className='rounded-full size-8' />
                                </Link>
                                <div className=''>
                                    <h1 className='text-xs capitalize text-white font-semibold'>Hello,</h1>
                                    <h1 className='md:text-xl capitalize text-[#1DA1F2] font-extrabold tracking-wider'>Guest</h1>
                                </div>
                            </div>
                    }

                    {/* <Breadcrumbs /> */}
                    <div className='items-center justify-around md:flex hidden md:w-auto w-0'>
                        <Link href="/">
                            <p className={`px-2 py-2 mx-4 cursor-pointer text-white font-bold ${pathName.includes("/") && page == "landing" ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#fff] hover:border-b-3"} `} >Home</p>
                        </Link>
                        <Link href="/home">
                            <p className={`px-2 py-2 mx-4 cursor-pointer hover:border-b-3 text-white font-bold ${pathName.includes("/home") ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#fff]"} `} >Editor</p>
                        </Link>
                        <Link href="">
                            <p className={`px-2 py-2 mx-4 cursor-pointer text-white font-bold ${pathName.includes("github") ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#fff] hover:border-b-3"} `} >Docs</p>
                        </Link>
                        <Link href="/pricing">
                            <p className={`px-2 py-2 mx-4 cursor-pointer hover:border-b-3 text-white font-bold ${pathName.includes("pricing") ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#fff]"} `}>Pricing</p>
                        </Link>
                        <Link href="">
                            <p className={`px-2 py-2 mx-4 cursor-pointer text-white font-bold ${pathName.includes("t.me") ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#fff] hover:border-b-3"} `} >Contact us</p>
                        </Link>
                    </div>

                    <div className='mr-5'>
                        <SignedOut>
                            <div className='bg-[#1da1f2] px-4 py-2 rounded-lg text-white md:text-sm text-xs font-semibold'>
                                <SignInButton />
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
                :
                <div className='flex items-center w-full justify-between md:px-4 px-2 '>
                    <Link href="/">
                        <Image alt="" src="/icons/prelo_logo.jpg" width={30} height={30} className='rounded-full md:size-8 size-6' />
                    </Link>
                    <div className='items-center justfy-around md:flex hidden md:w-auto w-0 '>
                        <Link href="/">
                            <p className={`px-2 py-2 mx-4 cursor-pointer text-black font-bold ${pathName.includes("/") && page == "landing" ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#000] hover:border-b-3"} `} >Home</p>
                        </Link>
                        <Link href="/home">
                            <p className={`px-2 py-2 mx-4 cursor-pointer text-black font-bold ${pathName.includes("home") ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#000] hover:border-b-3"} `} >Editor</p>
                        </Link>
                        <Link href="">
                            <p className={`px-2 py-2 mx-4 cursor-pointer text-black font-bold ${pathName.includes("github") ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#000] hover:border-b-3"} `} >Docs</p>
                        </Link>
                        <Link href="/pricing">
                            <p className={`px-2 py-2 mx-4 cursor-pointer hover:border-b-3 text-black font-bold ${pathName.includes("pricing") ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#000]"} `} >Pricing</p>
                        </Link>
                        <Link href="">
                            <p className={`px-2 py-2 mx-4 cursor-pointer text-black font-bold ${pathName.includes("t.me") ? "border-b-[#1da1f2] border-b-3" : "hover:border-b-[#000] hover:border-b-3"} `} >Contact us</p>
                        </Link>
                    </div>
                    <Link href={"/home"} className="cursor-pointer md:w-[10rem] w-[7rem] md:h-[3rem] h-[2rem] bg-[#1da1f2] text-white md:rounded-lg rounded-sm font-bold flex items-center justify-center md:text-normal text-xs">
                        <p>Sign up/in</p>
                        {/* <ArrowRightIcon className="md:size-6 size-4 text-white mx-2" /> */}
                    </Link>
                </div>
            }

        </div>
    )
}

export default Header