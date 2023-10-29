import { Button } from "@chakra-ui/react";


export default function Feedback() {

    return (

        <div className="space-x-5">
            <h4>Do you think we got it right?</h4>
            <Button colorScheme="green">Yes</Button>
            <Button colorScheme="red">No</Button>
        </div>

    )
}