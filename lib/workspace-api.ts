export type ExtractResponse = {
  text: string;
  characters?: number;
  words?: number;
  confidence?: number;
};

/** POST /usage/ocr — multipart file upload for OCR extraction + usage tracking. */
export async function extractTextFormData(formData: FormData) {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:3000";
  let authHeaders: Record<string, string> = {};
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("fracto_access_token");
    const apiKey = localStorage.getItem("fracto_api_key");
    const apiSecret = localStorage.getItem("fracto_api_secret");
    if (token) authHeaders.Authorization = `Bearer ${token}`;
    if (apiKey) authHeaders["x-api-key"] = apiKey;
    if (apiSecret) authHeaders["x-api-secret"] = apiSecret;
  }

  const response = await fetch(`${base}/usage/ocr`, {
    method: "POST",
    body: formData,
    headers: authHeaders,
  });
  const json = (await response.json().catch(() => null)) as ExtractResponse | { message?: string } | null;
  if (!response.ok) {
    throw new Error(
      json && typeof json === "object" && "message" in json && typeof (json as { message: string }).message === "string"
        ? (json as { message: string }).message
        : `Extract failed (${response.status})`
    );
  }
  return json as ExtractResponse;
}
