import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { LabelProps } from '@radix-ui/react-label';

export const Label = ({ htmlFor, children, className }: LabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={clsx(
                twMerge(
                    'mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400',
                    className
                )
            )}
        >
            {children}
        </label>
    );
};
