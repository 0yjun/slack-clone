"use client";
import useInput from "@hooks/useInput";
import {
  Input,
  Label,
  Header,
  Button,
  Form,
  Error,
  Success,
} from "@app/signup/styles";
import { ChangeEvent, useCallback, useState } from "react";
import useCRUD from "@/hooks/useCRUD";

const SignUp = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { response, isError, error, performRequest } = useCRUD(
    "/api/auth/signup",
    "POST",
    {
      data: { email, nickname, password },
    }
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck, setPassword]
  );
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [passwordCheck, setPasswordCheck]
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("onsubmit");
      if (!nickname || !nickname.trim()) {
        return;
      }
      if (mismatchError) {
        setSignUpError(true);
        setSignUpSuccess(false);
        return;
      }
      performRequest();
      if (isError) {
        const errorMessage = error?.response
          ? error.response
          : "오류가 발생했습니다.";
        alert(errorMessage);
        setSignUpSuccess(false);
        setSignUpError(true);
      } else {
        alert("성공");
        console.log(response, isError, error);
        setSignUpSuccess(true);
        setSignUpError(false);
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
              onChange={onChangePasswordCheck}
            />
          </div>
          {/* 확인 메세지 */}
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
          {signUpSuccess && (
            <Success>회원가입되었습니다! 로그인해주세요.</Success>
          )}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
    </div>
  );
};

export default SignUp;
