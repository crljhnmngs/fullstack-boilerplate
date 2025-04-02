import { useState } from 'react';
import { FormDropdownProps } from '@/presentation/types';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import { ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandInput,
    CommandEmpty,
} from '../ui/command';
import { MdError } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

export const FormDropdown = <T,>({
    data,
    value,
    setValue,
    defaultText,
    contentWith,
    triggerHeight,
    search,
    searchPlaceholder,
    searchEmptyText,
    error,
    label,
}: FormDropdownProps<T>) => {
    const [open, setOpen] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSelect = (value: T) => {
        setValue(value);
        setOpen(false);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
                <label
                    className="text-[#231D15] text-base font-medium"
                    htmlFor="dropdown"
                >
                    {label}
                </label>
                <AnimatePresence mode="wait" initial={false}>
                    {error && (
                        <motion.div
                            className="relative flex items-center gap-1 text-red-500  mr-2 group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MdError
                                className="cursor-pointer text-2xl "
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            />

                            {isHovered && (
                                <div className="absolute right-full mr-1 top-1/8 -translate-y-1/2 bg-white text-red-400 text-[14px] rounded-md px-3 py-1 shadow-md border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                    {error}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    asChild
                    className={cn(
                        `h-11 ${error && 'border-red-600'}`,
                        triggerHeight
                    )}
                >
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn('justify-between', contentWith)}
                    >
                        {value !== undefined
                            ? data.find((item) => item.value === value)?.label
                            : defaultText}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] p-1"
                >
                    <Command>
                        {search && (
                            <CommandInput
                                placeholder={
                                    searchPlaceholder
                                        ? searchPlaceholder
                                        : 'Search data'
                                }
                                className="h-9"
                            />
                        )}

                        <CommandList>
                            {search && (
                                <CommandEmpty>
                                    {searchEmptyText
                                        ? searchEmptyText
                                        : 'No data found.'}
                                </CommandEmpty>
                            )}
                            <CommandGroup>
                                {data.map((item) => (
                                    <CommandItem
                                        key={String(item.value)}
                                        value={String(item.label)}
                                        onSelect={() =>
                                            handleSelect(item.value)
                                        }
                                        className="p-2"
                                    >
                                        {item.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};
