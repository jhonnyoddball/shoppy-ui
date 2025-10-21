import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

export const getHeaders = () => ({
  Cookie: cookies().toString()
})

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const res = await fetch(`${API_URL}/${cleanPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(body),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: '', data: parsedRes };
};

export const get = async <T>(path: string, tags?: string[], params?: URLSearchParams) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const url = params ? `${API_URL}/${cleanPath}?${params.toString()}` : `${API_URL}/${cleanPath}`;
  const res = await fetch(url, {
    headers: {...getHeaders()},
    next: { tags }
  });
  return res.json() as T;
}
