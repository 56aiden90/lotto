import {RESULT_TYPE} from './enums';

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
export interface NumGenResult{
  type : RESULT_TYPE;
}
export interface BirthResult extends NumGenResult{
    type: RESULT_TYPE.BIRTH;
    numbers: number[];
    birth: string;
    name: string;
};
export interface PsyResult extends NumGenResult {
    type: RESULT_TYPE.PSY;
    numbers: number[];
};
export interface QuoteResult extends NumGenResult {
    type: RESULT_TYPE.QUOTE;
    numbers: number[];
    quote: string;
};

export type ErrorResult = {
    type: RESULT_TYPE.ERROR;
};
export type LottoResult = BirthResult | PsyResult | QuoteResult | ErrorResult;
