const AUTH_KEY = 'isAuthenticated';

export const saveAuth = () => {
    localStorage.setItem(AUTH_KEY, 'true');
};

export const clearAuth = () => {
    localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'true';
};
