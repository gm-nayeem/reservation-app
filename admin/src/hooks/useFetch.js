import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../utils/request";

const useFetch = (url, requestType="") => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // fetch data from server
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if(requestType === "userRequest") {
                    const res = await userRequest.get(url);
                    setData(res.data);
                } else {
                    const res = await publicRequest.get(url);
                    setData(res.data);
                }
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);


    // refetch data
    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await publicRequest.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;