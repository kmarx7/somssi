"use client";
import { useActionState } from "react";
import { signInAdmin, type AdminLoginState } from "@/app/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Card, Container } from "@/components/ui/layout";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState<AdminLoginState, FormData>(signInAdmin, {});
  return <Container className="checkout-page"><Card><p className="eyebrow">SOMSSI / ADMIN</p><h1>관리자 로그인</h1><p>관리자 계정으로 로그인해 주세요.</p><form action={action} className="form-stack"><label className="field"><span>이메일</span><input className="input" name="email" type="email" autoComplete="email" required /></label><label className="field"><span>비밀번호</span><input className="input" name="password" type="password" autoComplete="current-password" required /></label>{state.error ? <p className="form-alert" role="alert">{state.error}</p> : null}<Button type="submit" pending={pending}>{pending ? "로그인 중…" : "로그인"}</Button></form></Card></Container>;
}
