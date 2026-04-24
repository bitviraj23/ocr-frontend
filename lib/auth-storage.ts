export type AuthRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export type AuthState = {
  token: string | null;
  role: AuthRole | null;
  apiKey: string | null;
  apiSecret: string | null;
};

const TOKEN_KEY = "fracto_access_token";
const ROLE_KEY = "fracto_role";
const API_KEY_KEY = "fracto_api_key";
const API_SECRET_KEY = "fracto_api_secret";

export function setAuthState(input: {
  token: string;
  role: AuthRole;
  apiKey?: string | null;
  apiSecret?: string | null;
}) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, input.token);
  localStorage.setItem(ROLE_KEY, input.role);
  if (input.apiKey) localStorage.setItem(API_KEY_KEY, input.apiKey);
  if (input.apiSecret) localStorage.setItem(API_SECRET_KEY, input.apiSecret);
}

export function clearAuthState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(API_KEY_KEY);
  localStorage.removeItem(API_SECRET_KEY);
}

export function getAuthState(): AuthState {
  if (typeof window === "undefined") {
    return { token: null, role: null, apiKey: null, apiSecret: null };
  }

  const token = localStorage.getItem(TOKEN_KEY);
  const roleRaw = localStorage.getItem(ROLE_KEY) as AuthRole | null;
  const apiKey = localStorage.getItem(API_KEY_KEY);
  const apiSecret = localStorage.getItem(API_SECRET_KEY);

  const role: AuthRole | null =
    roleRaw === "SUPER_ADMIN" || roleRaw === "ADMIN" || roleRaw === "USER"
      ? roleRaw
      : null;

  return { token, role, apiKey, apiSecret };
}

export function extractToken(resp: any): string | null {
  if (!resp || typeof resp !== "object") return null;
  const candidate =
    resp.access_token ??
    resp.accessToken ??
    resp.token ??
    resp.jwt ??
    resp.data?.access_token ??
    resp.data?.accessToken ??
    resp.data?.token ??
    resp.data?.jwt;
  return typeof candidate === "string" ? candidate : null;
}
