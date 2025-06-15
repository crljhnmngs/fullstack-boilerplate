export const assignFields = <T extends object>(
    target: T,
    source: Partial<T>,
    fields: (keyof T)[]
): void => {
    for (const field of fields) {
        if (field in source && source[field] !== undefined) {
            target[field] = source[field]!;
        }
    }
};

export const escapeRegex = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
