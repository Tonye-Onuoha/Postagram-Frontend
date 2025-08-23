import { useNavigate } from "react-router-dom";
import { setLocalStorage, postData, patchData } from "../helpers/fetchAPI";

function useUserActions() {
    const navigate = useNavigate();
    return { register, login, logout, edit };

    // Register the user
    async function register(data) {
        const response = await postData("/api/core/auth/register/", data, true);
        setLocalStorage(response.access, response.refresh, response.user);
        navigate("/");
    }

    // Login the user
    async function login(data) {
        const response = await postData("/api/core/auth/login/", data, false, true);
        if ("detail" in response) {
            throw new Error(response.detail);
        }
        setLocalStorage(response.access, response.refresh, response.user);
        navigate("/");
    }

    // Edit the user
    async function edit(userId, data) {
        const userObject = await patchData(`/api/core/users/${userId}/`, data);
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();
        setLocalStorage(accessToken, refreshToken, userObject);
    }

    // Logout the user
    async function logout(data) {
        const response = await postData("/api/core/auth/logout/", data, false, false, true);
        if (response.status === 204) {
            localStorage.removeItem("auth");
            navigate("/login/");
        } else if (response.status === 400) {
            const jsonResponse = await response.json();
            throw new Error(jsonResponse?.detail); // returns the response detail as the error-message.
        }
    }
}

// Get the user
export function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth?.user;
}
// Get the access token
export function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth?.access;
}

// Get the refresh token
export function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth?.refresh;
}

// Refresh the current page
export function refreshPage() {
    const TIMEOUT = 3500;
    const reload = window.location.reload.bind(window.location);
    setTimeout(reload, TIMEOUT);
}

export { useUserActions };
