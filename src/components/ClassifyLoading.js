import Image from "next/image";
import LoadingSVG from "@/images/loading.svg";
import { useState } from "react";
import { useEffect } from "react";
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = [
    "Uploading your image",
    "Working on it",
    "Almost there",
    "Almost",
    "Hang on"
]

export default function ClassifyLoading() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            1500,
          );
          return () => clearTimeout(intervalId);
    }, [])

    return (
        <div>
            <TextTransition springConfig={presets.wobbly} className="font-bold">{TEXTS[index % TEXTS.length]}</TextTransition>
             <Image src={LoadingSVG} width={50} height={50}/>
        </div>
    )
}