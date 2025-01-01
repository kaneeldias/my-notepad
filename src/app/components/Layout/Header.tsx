import Title from "@/app/components/Layout/Title";
import AuthController from "@/app/components/Auth/AuthController";

export default function Header() {
    return (
        <div
            className={`flex flex-row items-start justify-between bg-background border-gray-200 border-b-2 h-20 px-large`}>
            <Title/>
            <AuthController/>
        </div>
    );
}

