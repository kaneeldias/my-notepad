type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    size?: "small" | "normal" | "large";
    color?: "red";
}

export default function Button(props: Props) {
    const size = props.size || "normal";
    const py = size === "small" ? "py-small" : size === "large" ? "py-large" : "py-normal";
    const px = size === "small" ? "px-normal" : size === "large" ? "px-large" : "px-large";
    
    const color = props.color || "white";
    const colors = color === "red" ?
        "bg-red-500 text-white border-red-500 hover:bg-red-600" :
        "bg-white text-black border-gray-200 hover:bg-gray-100";
    
    return (
        <div
            className={`flex-row w-fit items-center ${px} justify-center rounded-md ${py} border-2 ${colors} transition-all cursor-pointer`}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}