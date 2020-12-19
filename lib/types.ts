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
