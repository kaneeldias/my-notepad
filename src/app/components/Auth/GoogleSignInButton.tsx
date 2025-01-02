"use client"

import {signIn} from "next-auth/react";
import Image from "next/image";
import Button from "@/app/components/Buttons/Button";
import {useSearchParams} from "next/navigation";

type Props = {
    id: string;
};
export default function GoogleSignInButton(props: Props) {
    const searchParams = useSearchParams();
    
    return (
        <Button
            onClick={() => signIn(props.id, {
                callbackUrl: searchParams.get("callbackUrl") || "/",
            })}>
            <div className={`flex flex-row items-center space-x-normal`}>
                <Image src={"/google.webp"} alt={"Google logo"} width={40} height={20}/>
                <div className={`font-bold`}> Continue with Google</div>
            </div>
        </Button>
    );
}