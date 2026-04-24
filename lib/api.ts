export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  let authHeaders: Record<string, string> = {};
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("fracto_access_token");
    const apiKey = localStorage.getItem("fracto_api_key");
    const apiSecret = localStorage.getItem("fracto_api_secret");
    if (token) authHeaders.Authorization = `Bearer ${token}`;
    if (apiKey) authHeaders["x-api-key"] = apiKey;
    if (apiSecret) authHeaders["x-api-secret"] = apiSecret;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const json = (await response.json().catch(() => null)) as { message?: string } | null;

  if (!response.ok) {
    throw new ApiError(
      json?.message || `Request failed with status ${response.status}`,
      response.status
    );
  }

  return json as T;
}
