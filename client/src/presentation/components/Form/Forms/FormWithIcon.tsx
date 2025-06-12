import { useState } from 'react';
import { ComponentCard } from '../../Common/ComponentCard';
import { Label } from '../Label/Label';
import { Form } from './Form';
import { Input } from '../Input/InputField';
import { Checkbox } from '../Input/Checkbox';
import { Button } from '../../ui/Button/Button';
import { GoArrowRight } from 'react-icons/go';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { CiLock } from 'react-icons/ci';
import { FiUser } from 'react-icons/fi';

export const FormWithIcon = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:');
    };

    const [isChecked, setIsChecked] = useState(false);
    return (
        <ComponentCard title="Example Form With Icons">
            <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Username"
                            id="username"
                            className="pl-11"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
                            <FiUser className="size-5" />
                        </span>
                    </div>{' '}
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Email Address"
                            id="email"
                            className="pl-11"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
                            <HiOutlineEnvelope className="size-5" />
                        </span>
                    </div>{' '}
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="Password"
                            id="password"
                            className="pl-11"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
                            <CiLock className="size-5" />
                        </span>
                    </div>{' '}
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            id="confirm-password"
                            className="pl-11"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
                            <CiLock className="size-5" />
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={isChecked}
                                onChange={setIsChecked}
                            />
                            <Label className="mb-0"> Remember me</Label>
                        </div>
                        <div>
                            <Button size="sm">
                                Create Account <GoArrowRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </ComponentCard>
    );
};
