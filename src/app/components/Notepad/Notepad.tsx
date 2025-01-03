"use client"

import React, {useEffect, useState} from "react";
import ClearAllButton from "@/app/components/Notepad/ClearAllButton";
import {getNotepadContent, sendSaveRequest, updateNotepad} from "@/app/utils/notepad-utils";
import {useSession} from "next-auth/react";
import {isLoggedIn} from "@/app/utils/auth-utils";
import SaveButton from "@/app/components/Notepad/SaveButton";

export default function Notepad() {
    const session = useSession();
    const [saving, setSaving] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    
    useEffect(() => {
        getNotepadContent(session).then(content => {
            setContent(content);
        });
    }, [session]);
    
    async function updateContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const content = e.target.value;
        setContent(content);
        await updateNotepad(session, content);
    }
    
    function clearAll() {
        setContent("");
        localStorage.removeItem("content");
    }
    
    async function save() {
        setSaving(true);
        if (isLoggedIn(session)) await sendSaveRequest(content);
        setSaving(false);
    }
    
    return (
        <div className={`w-full h-full`}>
            {content && (
                <div className={` space-x-normal flex justify-end fixed bottom-10 right-0 p-large`}>
                    <ClearAllButton onClick={clearAll}/>
                    <SaveButton onClick={save} disabled={saving}/>
                </div>
            )}
            
            <div className={`m-normal text-2xl md:text-4xl w-full h-full flex justify-center`}>
            <textarea
                className={`${content ? "opacity-100" : "opacity-60"} outline-0 w-full max-w-7xl h-full font-bold pr-large no-scrollbar resize-none`}
                autoFocus={true}
                onChange={updateContent}
                value={content} placeholder={"Start typing..."}
            />
            </div>
        
        </div>
    );
}