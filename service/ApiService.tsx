import ApiServiceInterface from '../interface/ApiServiceInterface';

class ApiService implements ApiServiceInterface {
    getJson(url: RequestInfo) {
        const endpointUrl = (process.env.API_SERVER_HOST || "http://http://3.34.234.132/api") + url;
        return fetch(endpointUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "passwd": "gworld"
            }
        }).then(res => {
            if (res.status !== 200) {
                return res.json().then(json => {
                    throw new Error(json)
                });
            }
            return res.json();
        }).then(responseBody => {
            return responseBody
        })
    }

    postJson(url: RequestInfo, requestBody: RequestInit) {
        const endpointUrl = (process.env.API_SERVER_HOST || "") + url;
        return fetch(endpointUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status !== 200) {
                return res.json().then(json => {
                    throw new Error(json)
                });
            }
            return res.json();
        }).then(responseBody => {
            return responseBody;
        })
    }
}

export default ApiService;