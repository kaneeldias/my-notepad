"use client"

import GoogleSignInButton from "@/app/components/Auth/GoogleSignInButton";
import {Suspense} from "react";

export default function Page() {
    return (
        <div className={`flex w-full h-full items-center justify-center`}>
            <Suspense fallback={<div></div>}>
                <GoogleSignInButton id={"google"}/>
            </Suspense>
        </div>
    );
}