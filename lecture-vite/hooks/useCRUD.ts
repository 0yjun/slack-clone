import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface CRUDOption {
  params?: Record<string, unknown>; // 요청 시 파라미터: 문자열 키와 값이 어떤 타입이든 가능
  data?: Record<string, unknown>; // 요청 시 데이터: 문자열 키와 값이 어떤 타입이든 가능
}

/**
 * CRUD 요청을 처리하는 훅입니다.
 *
 * @param url - 요청할 URL입니다.
 * @param method - HTTP 메서드입니다 (GET, POST, PUT, DELETE).
 * @param options - 추가 옵션입니다. params와 body를 포함할 수 있습니다.
 * @returns {Object} - 응답, 오류 상태, 오류 객체, 데이터 재검색 함수.
 */
const useCRUD = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: CRUDOption
) => {
  const { params, data } = options || {};
  const [response, setResponse] = useState<unknown | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = () => {
    axios({
      method: method,
      url: url,
      params: params,
      data: data,
    })
      .then((res: AxiosResponse) => {
        setResponse(res.data);
      })
      .catch((err: AxiosError) => {
        setIsError(true);
        setError(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [url, method, params, data, fetchData]);

  return { response, isError, error, fetchData };
};

export default useCRUD;
