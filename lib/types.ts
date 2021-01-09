type ApiSuccessResponse = {
    [propName: string]: any;
    success: true;
};
type ApiFailResponse = {
    [propName: string]: any;
    success: false;
    devMsg: string;
    userMsg: string;
};
export type ApiResponse = ApiSuccessResponse | ApiFailResponse;

export type BirthResult = {
    type: "birth";
    numbers: number[];
    birth: string;
    name: string;
};
export type PsyResult = {
    type: "psy";
    numbers: number[];
};
export type QuoteResult = {
    type: "quote";
    numbers: number[];
    quote: string;
};
export type ErrorResult = {
    type: "error";
};
export type LottoResult = BirthResult | PsyResult | QuoteResult | ErrorResult;
