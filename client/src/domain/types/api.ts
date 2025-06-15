import { UserData } from '@/application/types';
import { Pagination } from './global';
import { Profile } from '../entities/profile';
import { FieldErrorsResponse } from '@/application/store/errorStore';
import { User } from '../entities/user';

export type LoginResponse = {
    user: UserData;
    accessToken: string;
};

export type RefreshResponse = {
    user: UserData;
    accessToken: string;
};

export type UserProfileResponse = Omit<Profile, 'userId'>;

export type ApiResponse<TData = unknown, TError = GenericError> = {
    success: boolean;
    data: TData | null;
    message: string;
    error: TError | null;
};

export type PaginatedApiResponse<
    TData = unknown,
    TError = GenericError,
> = ApiResponse<TData, TError> & {
    pagination: Pagination;
};

export type GenericError = {
    code: number;
    message: string;
};

export type FormError<T> = GenericError & {
    field?: string;
    fieldErrors?: FieldErrorsResponse<T>;
};

export type RegistrationResData = {
    firstname: string;
    lastname: string;
    email: string;
    isEmailVerified: string;
};

export type UserWithProfile = Omit<User, 'password'> & {
    profile: Profile & { _id: string };
};

export type GetSalesParams = {
    page: number;
    limit: number;
    search?: string;
    couponUsed?: boolean;
    purchaseMethod?: string;
};

export type GetAllUserParams = {
    page: number;
    limit: number;
    search?: string;
    role?: string;
    isEmailVerified?: boolean;
};
