import {getProviders} from "next-auth/react";
import GoogleSignInButton from "@/app/components/Auth/GoogleSignInButton";

export default async function Page() {
    const providers = await getProviders();
    
    return (
        <div className={`flex w-full h-full items-center justify-center`}>
            <GoogleSignInButton id={providers!.google.id}/>
        </div>
    );
}