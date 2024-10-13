import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

type ReturnType<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
];

const useInput = <T>(initalData: T): ReturnType<T> => {
  const [value, setvalue] = useState(initalData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setvalue(e.target.value as unknown as T);
  }, []);
  return [value, handler, setvalue];
};

export default useInput;
