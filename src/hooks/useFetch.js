import { useState } from "react";
import axios from "axios";

export default function useFetch() {
    const [loading, setLoading] = useState(false)

    const GET = async (url) => {
        try {
            setLoading(true)
            var response = await axios.get(url);
            if (response.status !== 200) {return null;}

            setLoading(false)
            return response.data;
        } catch {
            setLoading(false)
            return null;
        }
    }

    const POST = async (url, body) => {
        try {
            setLoading(true)
            var response = await axios.post(url, body)
            if (response.status !== 200) {return null;}
            
            setLoading(false)
            return response.data;
        } catch {
            setLoading(false)
            return null;
        }
    }

    const POSTFORM = async (url, body) => {
        try {
            setLoading(true)
            var response = await axios.postForm(url, body)
            if (response.status !== 200) {return null;}
            
            setLoading(false)
            return response.data;
        } catch {
            setLoading(false)
            return null;
        }
    }


    const fetcher = {GET, POST, POSTFORM}

    return {loading, fetcher}
}