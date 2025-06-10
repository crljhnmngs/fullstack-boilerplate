import { ComponentCard } from '../../Common/ComponentCard';
import { Input } from '../../Form/Input/InputField';
import { Label } from '../../Form/Label/Label';
import { RxEnvelopeClosed } from 'react-icons/rx';
import { PhoneInput } from './PhoneInput';

export const InputGroup = () => {
    const countries = [
        { code: 'PH', label: '+63' },
        { code: 'US', label: '+1' },
        { code: 'GB', label: '+44' },
        { code: 'CA', label: '+1' },
        { code: 'AU', label: '+61' },
    ];
    const handlePhoneNumberChange = (phoneNumber: string) => {
        console.log('Updated phone number:', phoneNumber);
    };
    return (
        <ComponentCard title="Input Group">
            <div className="space-y-6">
                <div>
                    <Label>Email</Label>
                    <div className="relative">
                        <Input
                            placeholder="info@gmail.com"
                            type="text"
                            className="pl-[62px]"
                        />
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                            <RxEnvelopeClosed className="size-4" />
                        </span>
                    </div>
                </div>
                <div>
                    <Label>Phone</Label>
                    <PhoneInput
                        selectPosition="start"
                        countries={countries}
                        placeholder="+63 900 000 0000"
                        onChange={handlePhoneNumberChange}
                    />
                </div>{' '}
                <div>
                    <Label>Phone</Label>
                    <PhoneInput
                        selectPosition="end"
                        countries={countries}
                        placeholder="+63 900 000 0000"
                        onChange={handlePhoneNumberChange}
                    />
                </div>
            </div>
        </ComponentCard>
    );
};
