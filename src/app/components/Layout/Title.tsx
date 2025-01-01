"use client"

import {useSession} from "next-auth/react";

export default function Title() {
    const {data: session} = useSession();
    const name = session?.user?.name ? session.user.name.split(" ")[0] + "'s" : "My";
    
    return (
        <a href={"/"}>
            <div className={`text-textAccent text-xl font-bold bg-accent p-3 rounded-b-md`}>
                {name || "My"} Notepad
            </div>
        </a>
    );
}