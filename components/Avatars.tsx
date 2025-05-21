"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClientSideSuspense } from "@liveblocks/react";

function Avatars() {
    return (
        <div className="flex gap-2 items-center">
            <p className="font-light md:text-sm text-xs md:visible hidden">Users currently editing this page</p>
            <ClientSideSuspense fallback={<p className="font-light md:text-sm text-xs">Loading users...</p>}>
                <AvatarsContent />
            </ClientSideSuspense>
        </div>
    );
}

function AvatarsContent() {
    const others = useOthers();
    const self = useSelf();
    const all = [self, ...others];

    return (
        <div className="flex -space-x-5">
            {all.map((other, i) => {
                return (
                    <TooltipProvider key={other?.id + i}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className="hover:z-50 border-2 border-gray-700">
                                    <AvatarImage src={other?.info.avatar} className=""/>
                                    <AvatarFallback>{other?.info.name}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{self?.id === other?.id ? "You" : other?.info.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}
        </div>
    );
}

export default Avatars;