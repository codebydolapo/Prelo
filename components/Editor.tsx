"use client"

import { useRoom, useSelf } from '@liveblocks/react'
import React, { useEffect, useState } from 'react'
import * as Y from "yjs"
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
// import { Button } from './ui/button'
// import { MoonIcon, SunIcon } from 'lucide-react'
import { BlockNoteView } from "@blocknote/shadcn"
import { BlockNoteEditor } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from '@/lib/stringToColor'
import TranslateDocument from './TranslateDocument'
import ChatToDocument from './ChatToDocument'

type EditorProps = {
    doc: Y.Doc | undefined;
    provider?: LiveblocksYjsProvider ;
    darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {
    const userInfo = useSelf((me) => me.info)

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc!.getXmlFragment("document-store"),
            user: {
                name: userInfo?.name || "",
                color: userInfo?.email ? stringToColor(userInfo.email) : ""
            }
        }
    })

    return (
        <div className='relative md:max-w-6xl max-w-full mx-auto'>
            <BlockNoteView
                className='min-h-screen'
                editor={editor}
                theme={darkMode ? "dark" : "light"}
            />
        </div>
    )
}

function Editor() {

    const [doc, setDoc] = useState<Y.Doc>()
    const [provider, setProvider] = useState<LiveblocksYjsProvider>()
    // const [darkMode, setDarkMode] = useState(false)

    const room = useRoom()

    useEffect(() => {
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);
        setDoc(yDoc);
        setProvider(yProvider);

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        };
    }, [room]);

    if (!doc && !provider) {
        return null
    }

    // const style = darkMode
    //     ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
    //     : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"


    return (
        <div className='max-w-6xl mx-auto'>
            <div className='flex items-center gap-2 justify-end mb-10'>
                <TranslateDocument doc={doc!} />
                <ChatToDocument doc={doc!} />
                {/* <Button onClick={() => setDarkMode(!darkMode)} className={style}>{darkMode ? <MoonIcon /> : <SunIcon />}</Button> */}
            </div>

            <BlockNote doc={doc} provider={provider} darkMode={false} />
            {/* <BlockNote doc={doc} provider={provider} darkMode={darkMode} /> */}
        </div>
    )
}

export default Editor
