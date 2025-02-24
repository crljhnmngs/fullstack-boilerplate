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
    },
});

//INTERCEPTORS FOR REQUEST
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const storedData = sessionStorage.getItem('auth');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            config.headers.Authorization = `Bearer ${parsedData.state.token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

//INTERCEPTORS FOR RESPONSE
http.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

export default http;
