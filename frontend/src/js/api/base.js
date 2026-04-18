// fetch chung các api FE

const BASE_URL = "/api"

export async function request(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    }

     // ❗ chỉ add token nếu KHÔNG disable
    if (token && !options.skipAuth) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(BASE_URL + url, {
        headers,
        ...options
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}