import { LoginParams } from '@/presentation/types';
import { LoginResponse } from '../types/api';

export interface AuthPort {
    login(data: LoginParams): Promise<LoginResponse>;
}
