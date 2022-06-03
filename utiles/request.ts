import axios from "axios";
const API = 'http://localhost:8000';

interface ReqParams {
    method: string;
    data: any;
}

const request = (link: string, params: ReqParams, header: any = null) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer ",
    };

    if (header && header?.Authorization) {
        headers.Authorization = header.Authorization;
    }

    try {
        const ax = axios.create({
            baseURL: API,
            headers: headers,
        });

        const confiq: any = {
            method: (params && params.method) || "GET",
            url: link,
            data: (params && params.data) || "",
        };

        if (params && params.method && params.method === "GET" && params.data) {
            confiq.params = params.data || "";
        }
        console.log("confiq : ",API , headers)

        return ax(confiq)
            .then((res) => {
                return {
                    status: res.status,
                    data: res.data,
                    headers: res.headers,
                };
            })
            .catch((error) => {
                if (error.response) {
                    const { data, config, status } = error.response;
                    const throwError = {
                        message: data.message || "Internal Server Error",
                        status: status || 500,
                    };
                    return throwError;
                }
            });
    } catch (error) {
        console.log(error);
    }
};

export default request;
