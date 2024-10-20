import axios from "axios";

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((respose) => respose.data);
export default fetcher;
