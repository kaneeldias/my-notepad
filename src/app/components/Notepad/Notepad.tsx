"use client"

import {useEffect, useState} from "react";
import ClearAllButton from "@/app/components/Notepad/ClearAllButton";

export default function NotePad() {
    const [content, setContent] = useState<string>("");
    useEffect(() => {
        const savedContent = localStorage.getItem("content");
        if (savedContent) {
            setContent(savedContent);
        }
    }, []);
    
    const opacity = content ? "opacity-100" : "opacity-60";
    
    function updateContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const content = e.target.value;
        setContent(content);
        localStorage.setItem("content", content);
    }
    
    function clearAll() {
        setContent("");
        localStorage.removeItem("content");
    }
    
    return (
        <div className={`w-full h-full`}>
            {content && (
                <div className={`flex justify-end`}>
                    <ClearAllButton onClick={clearAll}/>
                </div>
            )}
            
            <div className={`m-normal text-2xl md:text-4xl w-full h-full flex justify-center`}>
            <textarea
                className={`${opacity} outline-0 w-full max-w-7xl h-full font-bold pr-large no-scrollbar resize-none`}
                autoFocus={true}
                onChange={updateContent}
                value={content} placeholder={"Start typing..."}/>
            </div>
        
        </div>
    );
}