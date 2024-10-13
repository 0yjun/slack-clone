import useInput from "@hooks/useInput";
import { Input, Label, Header } from "./Styles";
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
    [passwordCheck]
  );
  return (
    <div id="container">
      <Header>slack-react</Header>
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
    </div>
  );
};

export default SignUp;
