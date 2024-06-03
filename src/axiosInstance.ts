import axios from "axios";

const createAxiosInstance = ({
    baseURL,
    timeout = 3000,
    headers = { "X-Custom-Header": "foobar" },
  }:{
    baseURL:string,
    timeout:number,
    headers:any,
  }) => {
    if (!baseURL) {
      throw new Error("Base URL must be provided");
    }
    return axios.create({
      baseURL,
      timeout,
      headers,
    });
  };

  export {
    createAxiosInstance
  };