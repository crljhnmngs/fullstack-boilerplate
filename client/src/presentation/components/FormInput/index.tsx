import { useState } from 'react';
import { FormInputProps } from '../../types';
import { cn } from '@/lib/utils';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Input } from '../ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from 'react-icons/md';

export const FormInput = <T extends Record<string, unknown>>({
    name,
    type,
    placeholder,
    label,
    error,
    classNames,
    register,
    rules,
    ...props
}: FormInputProps<T>) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
                <label
                    className={cn(
                        'text-[#231D15] text-base font-medium',
                        classNames?.label
                    )}
                    htmlFor={name}
                >
                    {label}
                </label>
                <AnimatePresence mode="wait" initial={false}>
                    {error ? (
                        <motion.div
                            className="relative flex items-center gap-1 text-red-500  mr-2 group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MdError
                                className="cursor-pointer text-xl "
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            />

                            {isHovered && (
                                <div className="absolute right-full mr-1 top-1/8 -translate-y-1/2 bg-white text-red-400 text-[14px] rounded-md px-3 py-1 shadow-md border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                    {error}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <div className="h-full opacity-0 pointer-events-none">
                            <MdError className="text-2xl" />
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative">
                <Input
                    type={
                        type === 'password'
                            ? !passwordVisible
                                ? 'password'
                                : 'text'
                            : type
                    }
                    id={name as string}
                    placeholder={placeholder}
                    className={cn(
                        `h-12 w-full text-sm border ${error && 'border-red-500 focus:outline-none'} ${type === 'password' && 'pr-3'} rounded-md mx-0 my-2 px-4 py-0 mt-1`,
                        classNames?.input
                    )}
                    {...register(name, rules)}
                    {...props}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? (
                            <FaEyeSlash className="text-[22px]" />
                        ) : (
                            <FaEye className="text-xl" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
