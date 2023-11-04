import { useState } from "react";
import { useEffect } from "react";
import TextTransition, { presets } from 'react-text-transition';
import Loading from "./Loading";

const TEXTS = [
    "Uploading",
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
        <div className="flex justify-center items-center">
            <TextTransition springConfig={presets.wobbly} className="font-bold">{TEXTS[index % TEXTS.length]}</TextTransition>
            <Loading width={50} height={50}/>
        </div>
    )
}