"use client"

import { db } from '@/firebase'
import { doc } from 'firebase/firestore'
import { LightbulbIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { Lightbulb } from 'lucide-react'



function SidebarOption({ href, id }: { href: string, id: string }) {

    const [data] = useDocumentData(doc(db, "documents", id))

    const pathName = usePathname()

    const isActive = href.includes(pathName) && pathName !== "/"

    if (!data) return null

    return (
        <Link href={href} className={`relative border p-2 rounded-lg cursor-pointer md:w-[12rem] xs:w-[95%] h-[3rem] flex items-center justify-start px-2 space-x-2 ${isActive ? "bg-black font-bold text-white" : "border-gray-400"}`}>
            <Lightbulb className='w-5' color="#ff0" />
            <p className='truncate font-bold text-sm'>{data?.title}</p>
        </Link>
    )
}

export default SidebarOption