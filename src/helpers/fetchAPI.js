import { getUser, getAccessToken, getRefreshToken } from "../hooks/user_actions";

const baseURL = process.env.REACT_APP_API_URL;

function failedRequest() {
    throw new Error("Could not retry request!");
}

export function setLocalStorage(access, refresh, user = null) {
    if (user) {
        localStorage.setItem("auth", JSON.stringify({ access, refresh, user }));
    } else {
        localStorage.setItem("auth", JSON.stringify({ access, refresh }));
    }
}

export async function fetchData(url) {
    const access = getAccessToken();
    const response = await fetch(`${baseURL}${url}`, { headers: { Authorization: `Bearer ${access}` } });
    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 401) {
        return await refreshAuth(url);
    }
}

export async function postData(url, body, register = false, login = false) {
    const data = JSON.stringify(body);
    if (register || login) {
        const response = await fetch(`${baseURL}${url}`, {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: data
        });
        return await response.json();
    } else {
        const access = getAccessToken();
        const response = await fetch(`${baseURL}${url}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: data
        });
        if (response.status === 200) {
            return await response.json();
        } else if (response.status === 401) {
            return await refreshAuth(url, "POST", data);
        }
    }
}

export async function updateData(url, body) {
    const data = JSON.stringify(body);
    const access = getAccessToken();
    const response = await fetch(`${baseURL}${url}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${access}`, Accept: "application/json", "Content-Type": "application/json" },
        body: data
    });
    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 401) {
        return await refreshAuth(url, "PUT", data);
    }
}

export async function patchData(url, body) {
    const access = getAccessToken();
    const response = await fetch(`${baseURL}${url}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${access}`,
            Accept: "application/json"
        },
        body: body
    });
    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 401) {
        return await refreshAuth(url, "PATCH", body);
    }
}

export async function deleteData(url) {
    const access = getAccessToken();
    const response = await fetch(`${baseURL}${url}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${access}`, Accept: "application/json", "Content-Type": "application/json" }
    });
    if (response.status === 204) {
        return;
    } else if (response.status === 401) {
        return await refreshAuth(url, "DELETE");
    }
}

async function refreshAuth(failedRequestURL, requestMethod = "GET", data = null) {
    console.log("refreshing...");
    const refresh = getRefreshToken();
    const user = getUser();
    const refreshData = JSON.stringify({ refresh: refresh });
    const response = await fetch("http://127.0.0.1:8000/api/core/auth/token/refresh/", {
        method: "POST",
        headers: { Authorization: `Bearer ${refresh}`, Accept: "application/json", "Content-Type": "application/json" },
        body: refreshData
    });
    const { access } = await response.json();
    setLocalStorage(access, refresh, user);
    try {
        const response = await fetch(`${baseURL}${failedRequestURL}`, {
            method: requestMethod,
            headers:
                requestMethod !== "PATCH"
                    ? {
                          Authorization: `Bearer ${access}`,
                          Accept: "application/json",
                          "Content-Type": "application/json"
                      }
                    : {
                          Authorization: `Bearer ${access}`,
                          Accept: "application/json",
                          "Content-Type": "application/json"
                      },
            body: data
        });

        switch (requestMethod) {
            case "GET":
                if (response.status === 200) {
                    return await response.json();
                } else {
                    failedRequest();
                }
                break;
            case "POST":
                if (response.status === 201) {
                    return await response.json();
                } else {
                    failedRequest();
                }
                break;
            case "PUT":
                if (response.status === 200) {
                    return await response.json();
                } else {
                    failedRequest();
                }
                break;
            case "PATCH":
                if (response.status === 200) {
                    return await response.json();
                } else {
                    failedRequest();
                }
                break;
            case "DELETE":
                if (response.status === 204) {
                    return;
                } else {
                    failedRequest();
                }
                break;
            default:
                break;
        }
    } catch (error) {
        localStorage.removeItem("auth");
        throw new Error(error.message);
    }
}
