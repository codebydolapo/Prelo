"use client"

import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Breadcrumbs from './Breadcrumbs'
import Image from 'next/image'
import { MoveRightIcon, ArrowRightIcon } from "lucide-react";
import Link from 'next/link'


function Header({ stripped }: { stripped: boolean }) {
    const { user } = useUser()


    return (
        <div className={`flex items-center justify-between ${stripped ? "bg-white" : "bg-black"} md:px-5 xs:px-3 py-3`}>
            {!stripped
                ?
                <div className='flex items-center justify-between w-full md:px-0 px-2'>
                    {
                        user
                            ?
                            <div className='flex space-x-2 items-center justify-center'>
                                <Link href="/">
                                    <Image alt="" src="/icons/prelo_logo.jpg" width={0} height={0} className='rounded-full size-8 cover' />
                                </Link>
                                <div className=''>
                                    <h1 className='text-xs capitalize text-white font-semibold'>Hello,</h1>
                                    <h1 className='md:text-xl capitalize text-[#1DA1F2] font-extrabold tracking-wider'>{`${user?.firstName}`}.</h1>
                                </div>
                            </div>
                            :
                            <div className='flex space-x-2'>
                                <Link href="/">
                                    <Image alt="" src="/icons/prelo_logo.jpg" width={45} height={45} className='rounded-full' />
                                </Link>
                                <div className=''>
                                    <h1 className='text-xs capitalize text-white font-semibold'>Hello,</h1>
                                    <h1 className='text-xl capitalize text-[#1DA1F2] font-semibold tracking-wider'>Guest</h1>
                                </div>
                            </div>
                    }

                    {/* <Breadcrumbs /> */}
                    <div className='flex items-center justfy-around '>
                        <p className="px-2 py-2 mx-4 cursor-pointer hover:border-b-3 hover:border-b-[#fff] text-white font-bold" >Home</p>
                        <p className="px-2 py-2 mx-4 border-b-3 border-b-[#1da1f2] cursor-pointer text-white font-bold" >Editor</p>
                        <p className="px-2 py-2 mx-4 cursor-pointer hover:border-b-3 hover:border-b-[#fff] text-white font-bold" >Docs</p>
                        <p className="px-2 py-2 mx-4 cursor-pointer hover:border-b-3 hover:border-b-[#fff] text-white font-bold" >Pricing</p>
                        <p className="px-2 py-2 mx-4 cursor-pointer hover:border-b-3 hover:border-b-[#fff] text-white font-bold" >Contact us</p>
                    </div>

                    <div className='mr-5'>
                        <SignedOut>
                            <div className='bg-[#1da1f2] px-4 py-2 rounded-lg text-white font-semibold'>
                                <SignInButton />
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
                :
                <div className='w-full h-full flex items-center justify-between md:px-4 px-2'>
                    <Link href="/">
                        <Image alt="" src="/icons/prelo_logo.jpg" width={30} height={30} className='rounded-full md:size-8 size-6' />
                    </Link>
                    <div className='flex items-center justfy-around '>
                        <p className="px-2 py-2 mx-4 border-b-3 border-b-[#1da1f2] cursor-pointer" >Home</p>
                        <p className="px-2 py-2 mx-4 cursor-pointer hover:border-b-3 hover:border-b-[#181818]" >Editor</p>
                        <p className="px-2 py-2 mx-4 cursor-pointer hover:border-b-3 hover:border-b-[#181818]" >Docs</p>
                        <p className="px-2 py-2 mx-4 cursor-pointer hover:border-b-3 hover:border-b-[#181818]" >Contact us</p>
                        <p className="px-2 py-2 mx-4 cursor-pointer hover:border-b-3 hover:border-b-[#181818]" >Pricing</p>
                    </div>
                    <Link href={"/home"} className="cursor-pointer md:w-[10rem] w-[7rem] md:h-[3rem] h-[2rem] bg-[#1da1f2] text-white md:rounded-lg rounded-sm font-bold flex items-center justify-center md:text-normal text-sm">
                        <p>Register</p>
                        {/* <ArrowRightIcon className="md:size-6 size-4 text-white mx-2" /> */}
                    </Link>
                </div>
            }

        </div>
    )
}

export default Header