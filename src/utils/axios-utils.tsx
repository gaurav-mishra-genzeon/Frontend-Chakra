import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const client = axios.create({ baseURL: `http://localhost:3001/api/notes` });

export const request = ({
  ...options
}: AxiosRequestConfig): Promise<AxiosResponse> => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (response: AxiosResponse<any>) => response;
  const onError = (error: AxiosError<any>) => {
    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};
