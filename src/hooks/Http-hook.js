import { useState } from 'react';
import axios from '../axios'

export const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState();
    const [loading, setloading] = useState(false);

    const fetchData = async (url, method, body = null) => {
        setloading(true)
        try {
            let res = await axios[method](url, body)
            setResponse(res.data)
            setloading(false)
            setError()
        } catch (error) {
            setError(error);
            setloading(false)
        }
    }

    return { response, error, loading, fetchData };
}

