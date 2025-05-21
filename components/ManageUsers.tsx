"use client"

import React, { useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Button } from './ui/button'
import { removeUserFromDocument } from '@/actions/actions'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import useOwner from '@/lib/useOwner'
import { useRoom } from '@liveblocks/react'
import { collectionGroup, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'

function ManageUsers() {

    const { user } = useUser();
    const room = useRoom()
    const isOwner = useOwner()

    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    );

    const handleDelete = (userId: string) => {
        startTransition(async () => {
            if (!user) return;
            const success = await removeUserFromDocument(room.id, userId);
            if (success) {
                toast.success("User removed from room successfully!");
            } else {
                toast.error("Failed to remove user from room!");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div className='md:px-4 md:py-2 px-2 py-2 flex bg-[#1da1f2] md:rounded-lg rounded-sm'>
                <DialogTrigger><p className = "md:text-sm text-xs font-semibold text-white"> Users ({usersInRoom?.docs.length || 0})</p></DialogTrigger>
            </div>
            {/* <Button asChild variant={"outline"}>
            </Button> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a user to collaborate?</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you would like to invite.
                    </DialogDescription>
                </DialogHeader>

                <hr className='my-2' />

                <div className='flex flex-col space-y-2'>
                    {usersInRoom?.docs.map((doc) => (
                        <div key={doc.data().userId} className="flex items-center justify-between">
                            <p className="font-light">
                                {doc.data().userId === user?.emailAddresses[0].toString()
                                    ? "You"
                                    : doc.data().userId}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button variant="outline">{doc.data().role}</Button>
                                {isOwner &&
                                    doc.data().userId != user?.emailAddresses[0].toString() && (
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(doc.data().userId)}
                                            disabled={isPending}
                                            size="sm"
                                        >
                                            {isPending ? "Removing..." : "X"}
                                        </Button>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default ManageUsers