"use client"

import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { Input } from "./ui/input"
import { Button } from './ui/button';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Editor from './Editor';
import useOwner from '@/lib/useOwner';
import DeleteDocument from './DeleteDocument';
import InviteUser from './InviteUser';
import ManageUsers from './ManageUsers';
import Avatars from './Avatars';
import { toast } from 'sonner';

function Document({ id }: { id: string }) {
    const [data, ,] = useDocumentData(doc(db, "documents", id))
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition()
    const isOwner = useOwner()

    useEffect(() => {

        if (data) {
            setInput(data.title)
        }
    }, [data])

    const updateTitle = (e: FormEvent) => {
        e.preventDefault()
        try {

            if (input.trim()) {
                startTransition(async () => {
                    await updateDoc(doc(db, "documents", id), {
                        title: input
                    })
                })
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while updating the title")
        }
    }


    return (
        <div className='flex-1 h-full bg-white p-5'>

            <div className='flex flex-1 max-w-6xl mx-auto justify-between pb-5'>
                <form onSubmit={updateTitle} className='flex flex-1 space-x-2'>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button disabled={isUpdating} type="submit" className='cursor-pointer'>{isUpdating ? "Updating" : "Update"}</Button>

                    {isOwner && (
                        <>
                            <InviteUser />
                            <DeleteDocument />
                        </>
                    )}
                </form>
            </div>

            <div className='flex max-w-6xl mx-auto justify-between items-center mb-4'>
                <ManageUsers />
                <Avatars />
            </div>

            <hr className='pb-5' />

            <Editor />
        </div>
    )
}

export default Document