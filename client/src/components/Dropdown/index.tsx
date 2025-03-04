import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { Command, CommandList, CommandGroup, CommandItem } from '../ui/command';
import { DropdownProps } from '../../types/global';

export const Dropdown = <T,>({
    data,
    value,
    setValue,
    open,
    setOpen,
    defaultText,
    contentWith,
    triggerHeight,
}: DropdownProps<T>) => {
    const handleCouponSelect = (value: T) => {
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
                    <CommandList>
                        <CommandGroup>
                            {data.map((item) => (
                                <CommandItem
                                    key={String(item.value)}
                                    value={String(item.label)}
                                    onSelect={() =>
                                        handleCouponSelect(item.value)
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
    );
};
