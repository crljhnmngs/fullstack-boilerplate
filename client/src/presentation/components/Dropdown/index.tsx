import { useState } from 'react';
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
import { DropdownProps } from '@/presentation/types';

export const Dropdown = <T,>({
    data,
    value,
    setValue,
    defaultText,
    contentWith,
    triggerHeight,
    search,
    searchPlaceholder,
    searchEmptyText,
}: DropdownProps<T>) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleSelect = (value: T) => {
        setValue((prevValue) => {
            return prevValue === value ? undefined : value;
        });
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                asChild
                className="h-11"
                style={{ height: triggerHeight || '44px' }}
            >
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                    style={{ width: contentWith || '200px' }}
                >
                    {value !== undefined
                        ? data.find((item) => item.value === value)?.label
                        : defaultText}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0"
                style={{ width: contentWith || '200px' }}
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
                                    onSelect={() => handleSelect(item.value)}
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
    );
};
