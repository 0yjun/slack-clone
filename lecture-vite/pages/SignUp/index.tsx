import useInput from "@hooks/useInput";
import { Input, Label, Header, Button, Form } from "./styles";
import fetcher from "@utils/fetcher";
import { ChangeEvent, useCallback, useState } from "react";
import useSWR from "swr";

const SignUp = () => {
  const { data, error, reavalidate } = useSWR("/api/users", fetcher);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck, setPassword]
  );
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck, setPasswordCheck]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!nickname || !nickname.trim()) {
        return;
      }
    },
    [email, nickname, password, mismatchError]
  );

  return (
    <div id="container">
      <Header>slack-react</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input
              type="nickname"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePassword}
            />
          </div>
          {/* 확인 메세지 */}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
    </div>
  );
};

export default SignUp;
