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


    useEffect(() => {
        if (user) {
            setUserEmail(user.emailAddresses[0].toString() || null);
            // console.log(user)
        }
    }, [user]);




    const [data, loading, error] = useCollection(user && (
        query(collectionGroup(db, `rooms`), where("userId", "==", userEmail))
    ))


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
        console.log(grouped)
        setGroupedData(grouped);
    }, [data]);


    const menuOptions = (
        <>
            <NewDocumentButton />

            {/* my documents */}
            <div className='flex py-4 flex-col space-y-4 md:max-w-36'>

                {groupedData.owner.length === 0 ? (
                    <h2 className='text-sm font-semiBold text-gray-500'>No Documents Found</h2>
                ) : (
                    <>
                        <h2 className='text-sm font-semiBold text-gray-500'>My Documents</h2>
                        {groupedData.owner.map((doc) => ( // Changed to owner
                            // <p key={doc.id}>{doc.roomId}</p>
                            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                )}

                {/* shared with me */}
                {groupedData.editor.length === 0 ? (
                    <h2 className='text-sm font-semiBold text-gray-500'>No Documents Found</h2>
                ) : (
                    <>
                        <h2 className='text-sm font-semiBold text-gray-500'>Shared with Me</h2>
                        {groupedData.owner.map((doc) => ( // Changed to owner
                            // <p key={doc.id}>{doc.roomId}</p>
                            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                )}
            </div>
        </>
    )




    return (
        <div className='pl-0 p-2 md:p-5 md:pl-2 flex flex-col justify-start items-start bg-gray-200'>
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
            <div className='hidden md:inline'>
                {menuOptions}
            </div>
        </div>
    )
}

export default Sidebar
