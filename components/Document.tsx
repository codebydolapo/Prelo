"use client"

import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { Input } from "./ui/input"
import { Button } from './ui/button';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { ParamValue } from 'next/dist/server/request/params';
import Editor from './Editor';

function Document({ id }: { id: string }) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition()
    // const isOwner = useOwner()

    useEffect(() => {
        if (data) {
            setInput(data.title)
        }
    }, [data])

    const updateTitle = (e: FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "rooms", id), {
                    title: input
                })
            })
        }
    }


    return (
        <div>

            <div className='flex flex-1 max-w-6xl mx-auto justify-between pb-5'>
                <form onSubmit={updateTitle} className='flex flex-1 space-x-2'>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button disabled={isUpdating} type="submit">{isUpdating ? "Updating" : "Update"}</Button>
                </form>
            </div>


            <div></div>

            <hr className='pb-10' />

            <Editor/>
        </div>
    )
}

export default Document