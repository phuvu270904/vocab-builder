import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const excludedEndpoints = ["/auth/login", "/auth/register"];
        if (excludedEndpoints.some((endpoint) => originalRequest.url.includes(endpoint))) {
            return Promise.reject(error);
        }

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post("/auth/refresh", { refreshToken }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.status === 200) {
                    const newToken = response.data.token;
                    localStorage.setItem("token", newToken);

                    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                // window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axios;
