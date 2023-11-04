import LoadingSVG from "@/images/loading.svg"
import Image from "next/image"

export default function Loading({width = 30, height = 30, classes = ""}) {
    
    return (
        <div>
            <Image src={LoadingSVG} width={width} height={height} className={`${classes}`}/>
        </div>
    )
}