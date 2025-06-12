import { useState } from 'react';
import { ComponentCard } from '../../Common/ComponentCard';
import { Label } from '../../Form/Label/Label';
import { TextArea } from '../Input/TextArea';

export const TextAreaInput = () => {
    const [message, setMessage] = useState('');
    const [messageTwo, setMessageTwo] = useState('');
    return (
        <ComponentCard title="Textarea input field">
            <div className="space-y-6">
                {/* Default TextArea */}
                <div>
                    <Label>Description</Label>
                    <TextArea
                        value={message}
                        onChange={(value: string) => setMessage(value)}
                        rows={6}
                    />
                </div>

                {/* Disabled TextArea */}
                <div>
                    <Label>Description</Label>
                    <TextArea rows={6} disabled />
                </div>

                {/* Error TextArea */}
                <div>
                    <Label>Description</Label>
                    <TextArea
                        rows={6}
                        value={messageTwo}
                        error
                        onChange={(value: string) => setMessageTwo(value)}
                        hint="Please enter a valid message."
                    />
                </div>
            </div>
        </ComponentCard>
    );
};
