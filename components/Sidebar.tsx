"use client"

import React, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { useCollection } from "react-firebase-hooks/firestore"
import { useUser } from '@clerk/nextjs'
import { collectionGroup, query, where, DocumentData } from 'firebase/firestore'
import { db } from '@/firebase'
import SidebarOption from './SidebarOption'
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import { RoomProvider } from '@liveblocks/react'
import LiveBlocksProvider from './LiveBlocksProvider'

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
    data: () => RoomDocument;
    owner: {
        push(arg0: {
            createdAt: string; role: "owner" | "editor"; roomId: string; userId: string; data: () => RoomDocument
            owner: { createdAt: string; role: "owner" | "editor"; roomId: string; userId: string; id: string }; id: string
        }): unknown; createdAt: string; role: "owner" | "editor"; roomId: string; userId: string; id: string
    }
}

function Sidebar() {
    const { user } = useUser()
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[],
        editor: RoomDocument[]
    }>({
        owner: [],
        editor: []
    })

    const [myOwnDocState, setMyOwnDocState] = useState(true)
    const [myReceivedDocState, setMyReceivedDocState] = useState(false)


    useEffect(() => {
        if (user) {
            setUserEmail(user.emailAddresses[0].toString() || null);
            // console.log(user)
        }
    }, [user]);




    const [data, ,] = useCollection(user && (
        query(collectionGroup(db, `rooms`), where("userId", "==", userEmail))
    ))

    const params = useParams<{ tag: string; item: string; id: string }>()


    useEffect(() => {
        // console.log(data)

        if (!data) return;

        const grouped = data.docs.reduce<{
            owner: RoomDocument[];  // Changed type here
            editor: RoomDocument[]; // Changed type here
        }>(
            (accumulator, currentDocument) => {
                const roomData = currentDocument.data() as RoomDocument

                if (roomData.role == "owner") {
                    accumulator.owner.push({
                        id: currentDocument.id,
                        ...roomData
                    });
                } else { //Added else if
                    accumulator.editor.push({
                        id: currentDocument.id,
                        ...roomData
                    });
                }

                return accumulator
            }, {
            owner: [],
            editor: []
        }
        );
        // console.log(grouped)
        setGroupedData(grouped);
    }, [data]);


    const menuOptions = (
        <>
            <NewDocumentButton />

            {/* my documents */}
            <div className='flex py-4 flex-col space-y-4 md:max-w-full'>
                <div className='flex flex-col mt-4 space-y-6'>
                    <button className='w-full flex items-center justify-between cursor-pointer' onClick={() => setMyOwnDocState(!myOwnDocState)}>
                        <h2 className='text-sm font-semiBold font-bold text-gray-700'>My Documents</h2>
                        {myOwnDocState ? <ChevronDown className='size-7 text-[#364153]' /> : <ChevronRight className='size-7' />}
                    </button>

                    {myOwnDocState &&
                        <>

                            {groupedData.owner.length === 0 ? (
                                <h2 className='text-sm font-normal text-gray-500'>No Documents Found</h2>
                            ) : (
                                <>
                                    {/* <h2 className='text-sm font-semiBold text-gray-500'>My Documents</h2> */}
                                    {groupedData.owner.map((doc) => (
                                        // <p key={doc.id}>{doc.roomId}</p>
                                        <SidebarOption key={doc.id} id={doc.id} href={`/home/doc/${doc.id}`} />
                                    ))}
                                </>
                            )}
                        </>
                    }
                </div>

                <hr className='my-2 w-full' />


                <div className='flex flex-col mt-4 space-y-6'>
                    {/* shared with me */}
                    <button className='w-full flex items-center justify-between cursor-pointer' onClick={() => setMyReceivedDocState(!myReceivedDocState)}>
                        <h2 className='text-sm font-bold text-gray-700'>Shared with me</h2>
                        {myReceivedDocState ? <ChevronDown className='size-7 text-[#364153]' /> : <ChevronRight className='size-7' />}
                    </button>

                    {myReceivedDocState &&
                        <>
                            {groupedData.editor.length === 0 ? (
                                <h2 className='text-sm font-normal text-gray-500'>No Documents Found</h2>
                            ) : (
                                <>
                                    {/* <h2 className='text-sm font-semiBold text-gray-500'>Shared with Me</h2> */}
                                    {groupedData.owner.map((doc) => (
                                        // <p key={doc.id}>{doc.roomId}</p>
                                        <SidebarOption key={doc.id} id={doc.id} href={`/home/doc/${doc.id}`} />
                                    ))}
                                </>
                            )}
                        </>
                    }
                </div>
            </div>
        </>
    )




    return (
        <LiveBlocksProvider>

            <RoomProvider id={params.id} initialPresence={{ cursor: null }}>

                <div className='pl-0 p-2 md:p-5 md:pr-2 md:pl-2 flex flex-col justify-start items-start bg-white'>
                    <div className='md:hidden'>
                        <Sheet>
                            <SheetTrigger>
                                <MenuIcon className='p-2 hover:opacity-30 rounded-lg' size={40} />
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                    {menuOptions}
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className='hidden md:inline md:px-4'>
                        {menuOptions}
                    </div>
                </div>
            </RoomProvider>
        </LiveBlocksProvider>

    )
}

export default Sidebar
