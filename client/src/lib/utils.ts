import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isAxiosError } from 'axios';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ShowAlertOptions } from '@/presentation/types';
import { ApiResponse, PaginatedApiResponse } from '@/domain/types/api';

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

type PossibleApiResponse<T> = ApiResponse<T> | PaginatedApiResponse<T>;

export const handleApiErrorToast = <T = unknown>(
    error: unknown,
    fallbackTitle = 'Request Failed',
    fallbackMessage = 'Something went wrong.'
) => {
    if (isAxiosError(error)) {
        if (error.response) {
            const data = error.response.data as PossibleApiResponse<T>;

            showAlert({
                title: data?.message || fallbackTitle,
                text: data?.error?.message || fallbackMessage,
                icon: AlertIcon.Error,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
        } else if (error.request) {
            showAlert({
                title: fallbackTitle,
                text: 'Network error. Please check your connection.',
                icon: AlertIcon.Error,
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
        }
    } else {
        showAlert({
            title: fallbackTitle,
            text: fallbackMessage,
            icon: AlertIcon.Error,
            toast: true,
            position: 'top-right',
            timer: 3000,
            timerProgressBar: true,
        });
    }
};

type ShowErrorAlertParams = {
    title: string;
    icon: AlertIcon;
    html?: string;
    onConfirm?: () => void;
};

export const showApiErrorAlert = ({
    title,
    icon,
    html = '',
    onConfirm,
}: ShowErrorAlertParams) => {
    showAlert({
        title,
        icon,
        html: html,
        timer: undefined,
        showConfirmButton: true,
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm();
        }
    });
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

export const calculateAge = (birthdate: Date): number => {
    const now = new Date();
    const dob = new Date(birthdate);
    let age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
        age--;
    }
    return age;
};
