import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from 'axios';

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
        const storedData = sessionStorage.getItem('auth');
        if (storedData) {
            const { state } = JSON.parse(storedData);
            if (state?.token) {
                config.headers.Authorization = `Bearer ${state.token}`;
            }
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
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        console.error(
            'API Response Error:',
            error?.response?.data || error.message
        );
        return Promise.reject(error);
    }
);

export default http;
