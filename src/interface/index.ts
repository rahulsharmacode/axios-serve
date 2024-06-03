export interface axiosGetProp {limit?:number,offset?:number,search?:string,university?:string}
export interface axiosCallProp{
    axiosInstance:any,
    params: axiosGetProp;
    endpoint: string;
    method?: any;
    id?: number|string| undefined;
    body?: any;
  }