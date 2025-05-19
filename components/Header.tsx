"use client"

import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Breadcrumbs from './Breadcrumbs'

function Header() {
    const { user } = useUser()


    return (
        <div className='flex items-center justify-between bg-black p-5'>
            {user ?
                <h1 className='text-2xl capitalize text-white font-semibold'>
                    {`${user?.firstName}&apos;`} Space
                </h1>
                :
                <h1 className='text-2xl capitalize text-white font-semibold'>
                    Guest's Space
                </h1>
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