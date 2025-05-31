import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import { RegisterFormData } from '@/presentation/validation/registerValidation';
import { UserWithoutId } from '@/domain/entities/user';
import { ProfileWithoutUserId } from '@/domain/entities/profile';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ShowAlertOptions } from '@/presentation/types';

/**
 * Utility function to merge class names using `clsx` and `twMerge`.
 * This function helps to conditionally join class names and merge Tailwind CSS classes,
 * resolving any conflicts in the class names (especially for Tailwind variants).
 *
 * @param inputs - A list of class values (strings, objects, or arrays) to be merged. This can include:
 *   - A string of class names (e.g., 'bg-red-500')
 *   - An object where keys are class names and values are booleans (e.g., `{ 'bg-blue-500': true }`)
 *   - An array of class names (e.g., ['p-4', 'm-2'])
 *
 * @returns A string representing the merged class names.
 *
 * @example
 * cn('bg-red-500', 'text-white');  // Returns: "bg-red-500 text-white"
 * cn('bg-red-500', { 'text-white': true });  // Returns: "bg-red-500 text-white"
 * cn('bg-red-500', ['p-4', 'm-2']);  // Returns: "bg-red-500 p-4 m-2"
 * cn('bg-red-500', 'text-white', { 'lg:text-xl': true });  // Returns: "bg-red-500 text-white lg:text-xl"
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a given date string into various formats based on the provided format type.
 *
 * @param date - The date to be formatted. It should be a valid date string that can be parsed by the JavaScript `Date` constructor.
 * @param format - An optional number that specifies the format of the returned date string. If not provided, the default format is used.
 *
 * Accepted format values:
 * - `1`: `"DD-MM-YYYY"` (e.g., `31-12-2025`)
 * - `2`: `"YYYY-MM-DD"` (e.g., `2025-12-31`)
 * - `4`: `"MMM DD, YYYY"` (e.g., `Dec 31, 2025`)
 * - `5`: `"DD MMM YYYY"` (e.g., `31 Dec 2025`)
 * - `6`: `"MMMM DD, YYYY"` (e.g., `December 31, 2025`)
 * - `7`: `"DD MMMM YYYY"` (e.g., `31 December 2025`)
 * - Default: `"MM-DD-YYYY"` (e.g., `12-31-2025`)
 *
 * @returns A string representing the formatted date based on the specified format type.
 *
 * @example
 * formatDate('2025-12-31', 1);  // Returns: "31-12-2025"
 * formatDate('2025-12-31', 2);  // Returns: "2025-12-31"
 * formatDate('2025-12-31', 4);  // Returns: "Dec 31, 2025"
 * formatDate('2025-12-31', 5);  // Returns: "31 Dec 2025"
 * formatDate('2025-12-31', 6);  // Returns: "December 31, 2025"
 * formatDate('2025-12-31', 7);  // Returns: "31 December 2025"
 * formatDate('2025-12-31');     // Returns: "12-31-2025" (default format)
 */
export const formatDate = (date: string, format?: number) => {
    const newDate = new Date(date);
    const DD = newDate.getDate().toString().padStart(2, '0');
    const MM = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const YYYY = newDate.getFullYear();
    const monthNameShort = newDate.toLocaleString('default', {
        month: 'short',
    });
    const monthNameFull = newDate.toLocaleString('default', {
        month: 'long',
    });

    let formatedData = '';

    switch (format) {
        case 1:
            formatedData = `${DD}-${MM}-${YYYY}`;
            break;
        case 2:
            formatedData = `${YYYY}-${MM}-${DD}`;
            break;
        case 4:
            formatedData = `${monthNameShort} ${DD}, ${YYYY}`;
            break;
        case 5:
            formatedData = `${DD} ${monthNameShort} ${YYYY}`;
            break;
        case 6:
            formatedData = `${monthNameFull} ${DD}, ${YYYY}`;
            break;
        case 7:
            formatedData = `${DD} ${monthNameFull} ${YYYY}`;
            break;
        default:
            formatedData = `${MM}-${DD}-${YYYY}`;
    }

    return formatedData;
};

/**
 * Capitalizes the first letter of a given string and returns the modified string.
 *
 * @param str - The string whose first letter is to be capitalized.
 *
 * @returns A new string with the first letter capitalized, and the rest of the string unchanged.
 *
 * @example
 * capitalizeFirstLetter('hello');  // Returns: "Hello"
 * capitalizeFirstLetter('world');  // Returns: "World"
 * capitalizeFirstLetter('javaScript');  // Returns: "JavaScript"
 */
export const capitalizeFirstLetter = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
};

export const handleApiError = (error: unknown, defaultMessage: string) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const { status, data } = error.response;
            const apiError = data as { message?: string };

            switch (status) {
                case 400:
                    return apiError.message || 'Invalid request.';
                case 401:
                    return apiError.message || 'Unauthorized. Please log in.';
                case 403:
                    return (
                        apiError.message || 'Forbidden. You do not have access.'
                    );
                case 404:
                    return apiError.message || 'Resource not found.';
                case 429:
                    return (
                        apiError.message ||
                        'Too many attempts, please try again later.'
                    );
                case 500:
                    return apiError.message || 'Server error. Try again later.';
                default:
                    return apiError.message || defaultMessage;
            }
        } else if (error.request) {
            return 'Network error. Please check your connection.';
        }
    }
    return defaultMessage;
};

export const transformRegisterData = (
    data: RegisterFormData
): UserWithoutId & ProfileWithoutUserId => {
    return {
        name: `${data.firstname} ${data.middlename ? data.middlename + ' ' : ''}${data.lastname}`.trim(),
        email: data.email,
        password: data.password,
        address: [data.city, data.state, data.country]
            .filter(Boolean)
            .join(', '),
        phone: data.phone.toString(),
        birthdate: new Date(data.birthdate).toISOString(),
        profileImage: data.profileImage,
    };
};

export enum AlertIcon {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info',
    Question = 'question',
}

export const showAlert = ({
    title,
    text,
    icon = AlertIcon.Info,
    timer = undefined,
    position = 'center',
    toast = false,
    html,
    showConfirmButton = false,
    timerProgressBar = false,
}: ShowAlertOptions): Promise<SweetAlertResult> => {
    return Swal.fire({
        title,
        text,
        icon,
        timer,
        position,
        toast,
        showConfirmButton,
        timerProgressBar,
        html,
    });
};
