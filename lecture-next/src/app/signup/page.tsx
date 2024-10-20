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
import { AxiosError } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

// type schemaType = {
//   email: string;
//   nickname: string;
//   password: string;
// };

const schema = z.object({
  email: z
    .string()
    .email("유효한 이메일을 입력해 주세요")
    .min(1, "이메일 입력해주세요"),
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  passwordCheck: z.string().min(6, "비밀번호 확인을 입력해주세요."),
});

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "", // 초기값 설정
      nickname: "", // 초기값 설정
      password: "", // 초기값 설정
      passwordCheck: "", // 초기값 설정
    },
  });

  const onSubmit = async (data) => {
    const signupRequest = {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupRequest),
      });
      if (!response.ok) {
        alert("오류");
      }

      const responseData = await response.json();
    } catch (error) {}
  };

  return (
    <div id="container">
      <Header>slack-react</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input type="email" id="email" {...field} />
              )}
            />
            {/* {errors.email && <Error>{errors.email}</Error>} */}
            {errors.email && <Error>이메일 오류</Error>}
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <Input type="text" id="nickname" {...field} />
              )}
            />
          </div>
          {errors.email && <Error>닉네임 오류</Error>}
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input type="password" id="password" {...field} />
              )}
            />
          </div>
          {(errors.password || errors.passwordCheck) && (
            <Error>비밀번호 오류</Error>
          )}
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Controller
              name="passwordCheck"
              control={control}
              render={({ field }) => (
                <Input type="password" id="password-check" {...field} />
              )}
            />
          </div>
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
    </div>
  );
};

export default SignUp;
