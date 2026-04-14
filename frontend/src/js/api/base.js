// fetch chung các api FE

const BASE_URL = "/api"

export async function request(url, options = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(BASE_URL + url, {
        headers: {
            "Content-Type": "application/json",
            ...(token && {Authorization: `Bearer ${JSON.parse(token)}`}) 
        },
        ...options
    });

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}