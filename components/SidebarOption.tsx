"use client"

import { db } from '@/firebase'
import { doc } from 'firebase/firestore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import "@blocknote/core/fonts/inter.css";




function SidebarOption({ href, id }: { href: string, id: string }) {

    const [data, ,] = useDocumentData(doc(db, "documents", id))

    const pathName = usePathname()

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const activity = href.includes(pathName) && pathName == `/home/doc/${id}`
        console.log(activity)
        setIsActive(activity)
    }, [])





    if (!data) return null



    return (
        <Link href={href} className={`relative p-2 rounded-lg cursor-pointer md:w-[12rem] xs:w-[95%] h-[3rem] flex items-center justify-start px-2 space-x-2 ${isActive ? "bg-black text-white shadow-md" : "bg-white shadow-md"}`}>
            <div className={`${isActive ? "w-3 h-3 rounded-full bg-[#1da1f2] font-bold" : "w-3 h-3 rounded-full bg-gray-300 font-medium"}`}></div>
            <p className='truncate text-sm'>{data?.title}</p>
           
        </Link>
    )
}

export default SidebarOption