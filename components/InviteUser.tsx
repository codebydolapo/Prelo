"use client"

import React, { FormEvent, useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { inviteUserToDocument } from '@/actions/actions'

function InviteUser() {

    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [isPending, startTransition] = useTransition()
    const pathname = usePathname()


    const handleInvite = async (e: FormEvent) => {

        e.preventDefault()
        const roomId = pathname.split("/").pop();
        if (!roomId) return;

        startTransition(async () => {
            const { success } = await inviteUserToDocument(roomId, email);
            if (success) {
                setIsOpen(false);
                setEmail("")
                toast.success("User added to room successfully!");
            } else {
                toast.error("Failed to add user to room!");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={"outline"} className='cursor-pointer'>
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a user to collaborate?</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you would like to invite.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleInvite} className='flex gap-2'>
                    <Input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit" disabled={!email || isPending}>
                        {isPending ? "Inviting..." : "Invite"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default InviteUser