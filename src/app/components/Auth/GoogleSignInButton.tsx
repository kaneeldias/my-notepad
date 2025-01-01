"use client"

import {signIn} from "next-auth/react";
import Image from "next/image";
import Button from "@/app/components/Buttons/Button";

type Props = {
    id: string;
};
export default function GoogleSignInButton(props: Props) {
    const query = new URLSearchParams(window.location.search);
    
    return (
        <Button
            onClick={() => signIn(props.id, {
                callbackUrl: query.get("callbackUrl") || "/",
            })}>
            <div className={`flex flex-row items-center space-x-normal`}>
                <Image src={"/google.webp"} alt={"Google logo"} width={40} height={20}/>
                <div className={`font-bold`}> Continue with Google</div>
            </div>
        </Button>
    );
}