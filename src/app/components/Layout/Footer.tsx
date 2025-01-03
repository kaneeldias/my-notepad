import Image from "next/image";

export default function Footer() {
    return (
        <div
            className={`flex flex-row  space-x-large items-center bg-gray-100 w-full p-normal border-t-2 border-gray-200`}>
            <div className={`text-xxs md:text-xs font-light text-left`}>
                Developed by <a href={"https://github.com/kaneeldias"} target={"_blank"}>Kaneel Dias</a> with 💖
            </div>
            
            <div>
                <a href={"https://github.com/kaneeldias/my-notepad"} target={"_blank"}>
                    <Image src={"/github.svg"} alt={"GitHub"} width={15} height={15}/>
                </a>
            </div>
        </div>
    );
}

