export type User = {
    name: { title: string; first: string; last: string };
    email: string;
    phone: string;
    picture: { large: string; medium: string; thumbnail: string };
    nat: string;
};

export type UserState = {
    users: User[];
    setUsers: (users: User[]) => void;
};

export type FetchUsersParams = {
    results?: number;
    nationality?: string;
};

export type ApiResponse = {
    results: User[];
    info: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
};
