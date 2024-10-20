import axios, { AxiosError, AxiosResponse } from "axios";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";

interface CRUDOption<T extends boolean = false> {
  params?: Record<string, unknown>; // 요청 시 파라미터: 문자열 키와 값이 어떤 타입이든 가능
  data?: Record<string, unknown>; // 요청 시 데이터: 문자열 키와 값이 어떤 타입이든 가능
  withCredentials?: boolean; // 기본값: true
  afterRefresh?: T; // 기본값: false
  refreshTime?: T extends true ? number : never; // afterRefresh가 true일 때만 number 타입 가능
}

/**
 * 데이터 패칭을 위한 fetcher 함수입니다.
 *
 * @param url - 요청할 URL입니다.
 * @param params - 요청 시 사용될 파라미터입니다.
 * @returns - 응답 데이터
 */
const fetcher = (url: string, params?: Record<string, unknown>) => {
  return axios.get(url, { params }).then((res: AxiosResponse) => res.data);
};

/**
 * CRUD 요청을 처리하는 훅입니다.
 *
 * @param url - 요청할 URL입니다.
 * @param method - HTTP 메서드입니다 (GET, POST, PUT, DELETE).
 * @param options - 추가 옵션입니다. params와 body를 포함할 수 있습니다.
 * @returns {Object} - 응답, 오류 상태, 오류 객체, CRUD 요청 수행 함수.
 */
const useCRUD = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: CRUDOption<true> // 기본값으로 true 설정
) => {
  const {
    params,
    data,
    withCredentials = true,
    afterRefresh = false,
    refreshTime,
  } = options || {};

  const { data: responseData, error } = useSWR(
    method === "GET" ? url : null,
    (url) => fetcher(url, params)
  );

  const [response, setResponse] = useState<unknown | null>(null); // 초기값은 null
  const [isError, setIsError] = useState<boolean>(false); // 초기값은 false
  const [errorState, setErrorState] = useState<AxiosError | null>(null); // 초기값은 null

  // SWR 데이터가 변경될 때 response 업데이트
  useEffect(() => {
    if (responseData) {
      setResponse(responseData);
      setIsError(false);
      setErrorState(null);
    }
  }, [responseData]);

  // CRUD 요청을 수행하는 함수
  const performRequest = async () => {
    try {
      if (method === "GET") {
        const response = await axios.get(url, { params, withCredentials });
        setResponse(response.data);
        setIsError(false);
        setErrorState(null);
      } else if (method === "POST" || method === "PUT" || method === "DELETE") {
        await axios({
          method,
          url,
          data,
          withCredentials,
        });

        // 작업 후 재조회
        if (afterRefresh) {
          mutate(url); // SWR에 의해 캐시된 데이터 재조회
        }
      }
    } catch (err) {
      setIsError(true);
      setErrorState(err as AxiosError);
    }
  };

  return { response, isError, error: errorState, performRequest };
};

export default useCRUD;
