import { Axios } from "axios";
import { axiosCallProp } from "./interface";

const setOptions = ({ token }: { token?: string }) => {
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };
  };

const getQuery = (params: { [key: string]: any }) => {
  const queryString = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return queryString ? `?${queryString}` : "";
};

const getParam = (id: number | string | undefined) => {
  return id ? `${id}` : "";
};

const getBody = (body: any) => {
  const isFile = (value: any) => value instanceof File;
  const containsFile = Object.values(body).some(isFile);
  if (containsFile) {
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    return formData;
  }
  return body;
};

const useAxiosCall = async (   
    axiosInstance: Axios,
    setOptions: any,
{
  params,
  endpoint,
  method,
  id,
  body,
}: axiosCallProp) : Promise<any> => {
  try {
    const query = getQuery(params);
    const param = getParam(id);
    const requestBody = body && getBody(body);

    if (!endpoint) {
      throw new Error("Endpoint is required");
    }
    switch (method?.toUpperCase()) {
      case "GET": {
        let { data, status } = await axiosInstance.get(
          endpoint + param + query,
          setOptions()
        );
        return { data, status };
      }

      case "POST": {
        let { data, status } = await axiosInstance.post(
          endpoint + param + query,
          requestBody,
          setOptions()
        );
        return { data, status };
      }

      case "PUT": {
        let { data, status } = await axiosInstance.put(
          endpoint + param + query,
          requestBody,
          setOptions()
        );
        return { data, status };
      }

      case "PATCH": {
        let { data, status } = await axiosInstance.patch(
          endpoint + param + query,
          requestBody,
          setOptions()
        );
        return { data, status };
      }

      case "DELETE": {
        let { data, status } = await axiosInstance.delete(
          endpoint + param + query,
          setOptions()
        );
        return { data, status };
      }

      default:
        return;
    }
  } catch (err: any) {
    return err;
  }
};

export{
    useAxiosCall,
    setOptions
}
