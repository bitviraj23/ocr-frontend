import { apiRequest } from "@/lib/api";

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  companyName: string;
  email: string;
  password: string;
};

type AuthResponse = {
  accessToken?: string;
  refreshToken?: string;
  message?: string;

  apiKey?: string;
  api_key?: string;

  apiSecret?: string;
  api_secret?: string;
};

export async function signupCompany(payload: SignupPayload) {
  // POST /companies (public company sign-up; isApproved: false until super-admin approves)
  return apiRequest<AuthResponse>("/companies", {
    method: "POST",
    body: {
      name: payload.companyName,
      email: payload.email,
      password: payload.password,
    },
  });
}

export async function superAdminLogin(payload: LoginPayload) {
  // POST /super-admin/login
  return apiRequest<AuthResponse>("/super-admin/login", {
    method: "POST",
    body: payload,
  });
}

export async function companyOwnerLogin(payload: LoginPayload) {
  // POST /companies/login
  return apiRequest<AuthResponse>("/companies/login", {
    method: "POST",
    body: payload,
  });
}

export async function userLogin(payload: LoginPayload) {
  // POST /user/login
  return apiRequest<AuthResponse>("/user/login", {
    method: "POST",
    body: payload,
  });
}
