"use client"

import React, { useEffect } from 'react'
import Document from '@/components/Document'
import { useParams } from 'next/navigation';
import { RoomProvider } from '@liveblocks/react';

function DocumentPage() {


    const params = useParams<{ tag: string; item: string; id: string }>()

    // useEffect(()=>{
    //     console.log("this is the parameter ID", params.id)
    // })


    return (
        <RoomProvider id={params.id} initialPresence={{ cursor: null }}>

        <div className='flex flex-col flex-1 min-h-screen '>
            <Document id = {params.id}/>
            {/* <h1>hello world</h1> */}
        </div>
        </RoomProvider>
    )
}

export default DocumentPage