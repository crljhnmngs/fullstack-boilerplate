import { UserData } from '@/application/types';
import { Sale } from '../entities/sale';
import { PaginatedResponse } from './global';
import { Profile } from '../entities/profile';

export type GetSalesApiResponse = PaginatedResponse<Sale>;

export type LoginResponse = {
    message: string;
    user: UserData;
    accessToken: string;
};

export type RefreshResponse = {
    user: UserData;
    accessToken: string;
};

export type UserProfileResponse = Omit<Profile, 'userId'>;
