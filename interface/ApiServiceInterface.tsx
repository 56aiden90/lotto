export default interface ApiServiceInferface {
    getJson(url: RequestInfo): void,
    postJson(url: RequestInfo, requestBody: RequestInit): void,
}