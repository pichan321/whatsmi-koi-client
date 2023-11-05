import useFetch from "@/hooks/useFetch";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import CheckedIcon from "@/images/checked.png";
import Image from "next/image";

export default function Feedback({handle, fetchFeed}) {
    const [shared, setShared] = useState(false);
    const {loading, fetcher} = useFetch();

    const share = async () => {
        var response = await fetcher.GET(`http://localhost:8080/feed-share/${handle}`)

        if (response) {
            setShared(true)
            fetchFeed()
        }
    }

    return (<div className="text-center">
        {!shared ?
            <div className="space-y-5">
            <h4>Share your KOI with others?</h4>
            <div className="space-x-5">
                <Button colorScheme="green" onClick={() => share()}>Yes</Button>
                <Button colorScheme="red">No</Button>
            </div>
        </div>
        : <div className="flex items-center justify-center space-x-2.5"><h3 className="font-bold">Shared</h3><Image src={CheckedIcon} width={30} height={35}/></div>
        }
        </div>
    )
}