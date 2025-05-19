"use client"

import { useTransition } from 'react';
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { createNewDocument } from '@/actions/actions'
import { PlusIcon } from 'lucide-react';

function NewDocumentButton() {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleCreateNewDocument() {
        startTransition(async () => {
            const { docId } = await createNewDocument();
            router.push(`/doc/${docId}`)
        })

    }


    return (
        // <Button onClick={handleCreateNewDocument} disabled={isPending} className='cursor-pointer'>{isPending ? "Creating..." : "New Document"}</Button>
        <button className='cursor-pointer md:w-[12rem] xs:w-[95%] h-[3rem] flex items-center justify-center bg-[#1da1f2] px-2 rounded-lg' >
            <PlusIcon className='w-5' color="#fff" />
            <p className='text-sm text-white font-bold mx-2'>
                {isPending ? "Creating..." : "New Document"}
            </p>
        </button>
    )
}

export default NewDocumentButton