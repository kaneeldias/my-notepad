"use client"

import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";
import Button from "@/app/components/Buttons/Button";

export default function AuthController() {
    const {data: session} = useSession();
    
    return (
        <div className={`flex flex-row items-center h-full`}>
            
            {!session?.user && (
                <Button size={"small"} onClick={() => signIn()}>
                    <div className={`text-sm`}>
                        <span className={`hidden md:block`}>Sign in to save notes across devices</span>
                        <span className={`md:hidden`}>Sign in</span>
                    </div>
                </Button>
            )}
            
            {session?.user && (
                <div className={`flex flex-row space-x-normal items-center`}>
                    <Button size={"small"} onClick={() => signOut()}>
                        <div className={`text-sm`}>Sign out</div>
                    </Button>
                    
                    <div className={`rounded-full`}>
                        <Image className={`rounded-full`} src={session.user.image || ""} alt={"Profile picture"}
                               width={30} height={30}/>
                    </div>
                </div>
            )}
        
        </div>
    );
}