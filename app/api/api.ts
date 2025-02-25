// api.ts
import axios from "axios";
import { API, headerConfig } from "./apiClients";

/**
 * FetchApiProps type
 * @type T is the type of data to be returned
 */
type FetchApiProps<T> = {
  endpoint: string;
};

/**
 * PostApiProps type
 * @type T is the type of data to be returned
 * @type TBody is the type of the request body
 */
type PostApiProps<T, TBody> = FetchApiProps<T> & {
  requestBody: TBody;
};

/**
 * Fetch data from the api
 * @param endpoint the endpoint to fetch data from
 * @returns the data from the api
 * T is the type of data to be returned
 */
const fetchData = async <DataType>({
  endpoint: endpoint,
}: FetchApiProps<DataType>): Promise<DataType[]> => {
  const { data } = await API.get(endpoint, { headers: headerConfig() });
  return data;
};

/**
 *
 * @param endpoint the endpoint to fetch a data
 * @returns the data from the api
 */
const fetchSingleData = async <Data>({
  endpoint: endpoint,
}: FetchApiProps<Data>): Promise<Data> => {
  const { data } = await API.get(endpoint, { headers: headerConfig() });
  return data;
};

const postData = async <DataType, ReqType>({
  endpoint,
  requestBody,
}: PostApiProps<DataType, ReqType>) => {
  const { data } = await axios.post(endpoint, requestBody);
  return data as DataType;
};

export { fetchData, postData, fetchSingleData };
