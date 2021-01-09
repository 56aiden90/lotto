import ApiServiceInterface from '../interface/ApiServiceInterface';

class ApiService implements ApiServiceInterface {
    getJson(url: RequestInfo) {
        const endpointUrl = (process.env.API_SERVER_HOST || "https://lotto-api.superposition.link") + url;
        return fetch(endpointUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "passwd": "gworld"
            }
        }).then(async res => {
            const responseBody = await res.json();
            if (res.status !== 200) {
                throw new Error(responseBody);
            }
            return responseBody;
        });
    }

    postJson(url: RequestInfo, requestBody: RequestInit) {
        const endpointUrl = (process.env.API_SERVER_HOST || "") + url;
        return fetch(endpointUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(requestBody),
        }).then(async res => {
            const responseBody = await res.json();
            if (res.status !== 200) {
                throw new Error(responseBody);
            }
            return responseBody;
        });
    }
}

export default ApiService;