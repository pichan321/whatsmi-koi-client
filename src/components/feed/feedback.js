import { Button } from "@chakra-ui/react";
import axios from "axios";

export default function Feedback({handle}) {

    const share = async () => {

        try {
            var response = await axios.get(`http://localhost:8080/feed-share/${handle}`)

        } catch {

        }
    }

    return (

        <div className="space-x-5">
            <h4>Share your KOI with others?</h4>
            <Button colorScheme="green" onClick={() => share()}>Yes</Button>
            <Button colorScheme="red">No</Button>
        </div>

    )
}