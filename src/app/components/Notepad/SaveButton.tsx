import Button from "@/app/components/Buttons/Button";

type Props = {
    onClick?: () => void;
    disabled?: boolean;
}

export default function SaveButton(props: Props) {
    return (
        <div className={``}>
            <Button color={"blue"} size={"large"} onClick={props.onClick} disabled={props.disabled}>
                <div className={`flex items-center space-x-normal`}>
                    <SaveIcon/>
                </div>
            </Button>
        </div>
    )
}

function SaveIcon() {
    return (
        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
             width="25px" height="25px" className={`fill-white`} viewBox="0 0 407.096 407.096">
            <g>
                <g>
                    <path d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086
                        c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032
                        C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z"/>
                    <path d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08
                        c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z"/>
                </g>
            </g>
        </svg>
    )
}