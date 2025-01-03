type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    size?: "small" | "normal" | "large";
    color?: "red" | "blue";
    disabled?: boolean;
}

export default function Button(props: Props) {
    return (
        <button className={`flex-row w-fit items-center ${getSizeClasses(props.size)} justify-center rounded-md border-2
                ${getColorClasses(props.color)} transition-all cursor-pointer ${getDisabledClass(props.disabled)}`}
                onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

function getSizeClasses(size?: string) {
    switch (size) {
        case "small":
            return "py-small px-normal";
        case "large":
            return "py-large px-large";
        default:
            return "py-normal px-large";
    }
}

function getColorClasses(color?: string) {
    switch (color) {
        case "red":
            return "bg-red-500 text-white border-red-500 hover:bg-red-600";
        case "blue":
            return "bg-blue-500 text-white border-blue-500 hover:bg-blue-600";
        default:
            return "bg-white text-black border-gray-200 hover:bg-gray-100";
    }
}

function getDisabledClass(disabled?: boolean) {
    if (disabled) {
        return "disabled opacity-50 cursor-not-allowed";
    }
    return "";
}