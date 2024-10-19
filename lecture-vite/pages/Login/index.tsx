import useInput from "@/hooks/useInput";
import {
  Input,
  LinkContainer,
  Form,
  Button,
  Label,
  Header,
  Error,
} from "@pages/SignUp/styles";
import fetcher from "@utils/fetcher";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { Route } from "react-router-dom";

const index = () => {
  const { data: userData, error, mutate } = useSWR("/api/users", fetcher);
  const [logInError, setLogInError] = useState(false); // 대소문자 및 이름 확인
  const [email, onchangeEmail] = useInput("");
  const [password, onchangePassword] = useInput("");
  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("오류 발생");
      e.preventDefault();
      setLogInError(false);
      axios
        .post("/api/auth/login", { email, password }, { withCredentials: true })
        .then(() => {
          mutate();
        })
        .catch((error: AxiosError) => {
          console.log(error);
          console.log("오류 발생");
          setLogInError(true);
        });
      console.log(error, userData);
      if (!error && userData) {
        console.log("로그인 " + userData);
        return <Route path="" />;
      }
    },
    [email, password, mutate]
  );
  return (
    <div id="container">
      <Header>slack-front</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" />
          </div>
        </Label>
        <Label id="passsword-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" />
          </div>
        </Label>
        <Button type="submit">로그인</Button>
        {logInError && (
          <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>
        )}
      </Form>
      <LinkContainer>
        아직 회원이 아니세요?&nbsp;
        <a href="/signup">회원가입하러 가기</a>
      </LinkContainer>
    </div>
  );
};

export default index;
