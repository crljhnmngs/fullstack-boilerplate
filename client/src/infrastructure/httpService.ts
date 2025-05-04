import { useAuthStore } from '@/application/store/authStore';
import { AuthUseCases } from '@/application/useCases/authUseCases';
import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from 'axios';
import { saveAuth } from './authStorage';

const authExcludedRoutes = ['/v1/auth/login', '/v1/auth/refresh'];

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (
    error: AxiosError | null,
    token: string | null = null
) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-secret': import.meta.env.VITE_API_SECRET_KEY,
    },
});

//INTERCEPTORS FOR REQUEST
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { accessToken } = useAuthStore.getState();
        if (!authExcludedRoutes.includes(config.url || '') && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => {
        console.error(
            'API Request Error:',
            error?.response?.data || error.message
        );
        return Promise.reject(error);
    }
);

//INTERCEPTORS FOR RESPONSE
http.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // Handle 401 Unauthorized errors by attempting a token refresh.
        // If the original request has not already been retried and is not a refresh request itself,
        // this logic will try to obtain a new access token and retry the failed request.
        // It also ensures that multiple simultaneous 401 errors queue and wait for a single token refresh.
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/v1/auth/refresh')
        ) {
            originalRequest._retry = true;

            const { setAuth, clearAuth } = useAuthStore.getState();

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            if (token) {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                            }
                            resolve(http(originalRequest));
                        },
                        reject,
                    });
                });
            }

            isRefreshing = true;

            try {
                const data = await AuthUseCases.refreshToken();
                setAuth(data.user, data.accessToken);
                saveAuth();
                processQueue(null, data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return http(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null);
                clearAuth();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default http;
