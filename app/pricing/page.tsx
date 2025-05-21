"use client"

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function pricing() {

    const pathName = usePathname()
    const [page, setPage] = useState("")

    useEffect(() => {

        if(pathName == `/pricing`){
            setPage("pricing")
        }
    })


    return (
        <div className='w-full h-full border-2 border-black'>
            {/* header */}
            {/* this is a makeshift component for the header, instead of the reusable component */}

            {/*  */}
        </div>
    )
}

export default pricing