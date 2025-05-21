'use client'
import React, { useState, useTransition } from 'react'
import * as Y from "yjs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BotIcon, LanguagesIcon } from 'lucide-react';
import { toast } from 'sonner';
import Markdown from "react-markdown"

type Language =
    | "english"
    | "spanish"
    | "portuguese"
    | "french"
    | "german"
    | "chinese"
    | "arabic"
    | "hindi"
    | "russian"
    | "japanese";

const languages: Language[] = [
    "english",
    "spanish",
    "portuguese",
    "french",
    "german",
    "chinese",
    "arabic",
    "hindi",
    "russian",
    "japanese",
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {

    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [language, setLanguage] = useState("")
    const [summary, setSummary] = useState("")
    // const [question, setQuestion] = useState("")

    const handleAskQuestion = (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        targetLang: language,
                    }),
                }
            );

            if (res.ok) {

                const { translated_text } = await res.json()
                setSummary(translated_text)
                toast.success("Text translated successfully")
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* <Button asChild variant={"outline"}>
                <LanguagesIcon />
                <DialogTrigger>Translate</DialogTrigger>
            </Button> */}
            <div className='px-4 py-2 flex space-x-2 rounded-lg bg-[#991df2] text-white font-bold'>
                <LanguagesIcon className='mr-2 size-6' />
                <DialogTrigger><p className='text-sm'>Translate</p></DialogTrigger>
            </div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Translate the document?</DialogTitle>
                    <DialogDescription>
                        Select a language and AI will translate a summary of the document in your desired language
                    </DialogDescription>
                    <hr className='mt-5' />
                    {/* {question && <p className='mt-5 text-gray-500'>Q: {question}</p>} */}
                </DialogHeader>
                {summary && (
                    <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                        <div className="flex">
                            <BotIcon className="w-10 flex-shrink-0" />
                            <p className="font-bold">
                                GPT{isPending ? " is thinking..." : " Says:"}
                            </p>
                        </div>
                        <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
                    </div>
                )}

                <form onSubmit={handleAskQuestion} className='flex gap-2'>
                    <Select value={language} onValueChange={(value) => setLanguage(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((language) => (
                                <SelectItem key={language} value={language}>
                                    {language.charAt(0).toUpperCase() + language.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* <Button type="submit" disabled={!language || isPending}>
                        {isPending ? "Translating..." : "Translate"}
                    </Button> */}
                    <button type='submit' disabled={!language || isPending}>
                        {isPending ? "Translating..." : "Translate"}
                    </button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default TranslateDocument