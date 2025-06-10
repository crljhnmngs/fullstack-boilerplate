import { ComponentCard } from '../../Common/ComponentCard';
import { Label } from '../../Form/Label/Label';
import { FileInput } from '../Input/FileInput';

export const FileInputExample = () => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Selected file:', file.name);
        }
    };

    return (
        <ComponentCard title="File Input">
            <div>
                <Label>Upload file</Label>
                <FileInput
                    onChange={handleFileChange}
                    className="custom-class"
                />
            </div>
        </ComponentCard>
    );
};
