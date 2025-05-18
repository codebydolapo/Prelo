"use client"

import React from 'react'
import Document from '@/components/Document'
import { useParams } from 'next/navigation';
import { RoomProvider } from '@liveblocks/react';

function DocumentPage() {


    const params = useParams<{ tag: string; item: string; id: string }>()


    console.log(params)


    return (
        <RoomProvider id={params.id} initialPresence={{ cursor: null }}>

        <div className='flex flex-col flex-1 min-h-screen '>
            <Document id = {params.id!.toString()}/>
        </div>
        </RoomProvider>
    )
}

export default DocumentPage