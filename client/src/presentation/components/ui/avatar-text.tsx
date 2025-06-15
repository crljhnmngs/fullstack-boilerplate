import { cn } from '@/lib/utils';
import { AvatarTextProps } from '@/presentation/types';

export const AvatarText = ({ name, classNames }: AvatarTextProps) => {
    // Generate initials from name
    const initials = name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    // Generate a consistent pastel color based on the name
    const getColorClass = (name: string) => {
        const colors = [
            'bg-brand-100 text-brand-600',
            'bg-pink-100 text-pink-600',
            'bg-cyan-100 text-cyan-600',
            'bg-orange-100 text-orange-600',
            'bg-green-100 text-green-600',
            'bg-purple-100 text-purple-600',
            'bg-yellow-100 text-yellow-600',
            'bg-error-100 text-error-600',
        ];

        const index = name
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[index % colors.length];
    };

    return (
        <div
            className={cn(
                `flex h-10 w-10 items-center justify-center rounded-full ${getColorClass(
                    name
                )}`,
                classNames?.div
            )}
        >
            <span className={cn('text-sm font-medium', classNames?.span)}>
                {initials}
            </span>
        </div>
    );
};
