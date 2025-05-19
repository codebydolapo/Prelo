"use client"

import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Breadcrumbs from './Breadcrumbs'
import Image from 'next/image'

function Header() {
    const { user } = useUser()


    return (
        <div className='flex items-center justify-between bg-black px-5 py-3'>
            {/* {user ?
                <h1 className='text-2xl capitalize text-white font-semibold'>
                    {`${user?.firstName}`}&apos;s Space
                </h1>
                :
                <h1 className='text-2xl capitalize text-white font-semibold'>
                    Guest&apos;s Space
                </h1>
            } */}
            {
                user ?
                    <div className='flex space-x-2'>
                        <Image alt="" src="/icons/prelo_logo.jpg" width={40} height={30} className='rounded-full' />
                        <div className=''>
                            <h1 className='text-xs capitalize text-white font-semibold'>Hello,</h1>
                            <h1 className='md:text-xl capitalize text-[#1DA1F2] font-semibold tracking-wider'>{`${user?.firstName}`}</h1>
                        </div>
                    </div>
                    :
                    <div className='flex space-x-2'>
                        <Image alt="" src="/icons/prelo_logo.jpg" width={45} height={45} className='rounded-full' />
                        <div className=''>
                            <h1 className='text-xs capitalize text-white font-semibold'>Hello,</h1>
                            <h1 className='text-xl capitalize text-[#1DA1F2] font-semibold tracking-wider'>Guest</h1>
                        </div>
                    </div>
            }

            <Breadcrumbs />

            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Header