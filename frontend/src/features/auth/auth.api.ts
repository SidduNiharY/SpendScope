import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export type AuthUser = { id: number; name: string; email: string };

export type SignupReq = { name: string; email: string; password: string };
export type LoginReq = { email: string; password: string };

export async function signupApi(payload: SignupReq) {
  const res = await http.post<AuthUser>(endpoints.auth.signup, payload);
  return res.data;
}

export async function loginApi(payload: LoginReq) {
  const res = await http.post<AuthUser>(endpoints.auth.login, payload);
  return res.data;
}

export async function meApi() {
  const res = await http.get<AuthUser>(endpoints.auth.me);
  return res.data;
}

export async function logoutApi() {
  await http.post(endpoints.auth.logout);
}