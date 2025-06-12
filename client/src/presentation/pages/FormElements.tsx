import { PageBreadcrumb } from '../components/Common/PageBreadCrumb';
import { PageMeta } from '../components/PageMeta';
import { DefaultInputs } from '../components/Form/Elements/DefaultInputs';
import { SelectInputs } from '../components/Form/Elements/SelectInputs';
import { TextAreaInput } from '../components/Form/Elements/TextAreaInput';
import { InputStates } from '../components/Form/Elements/InputStates';
import { InputGroup } from '../components/Form/Elements/InputGroup';
import { FileInputExample } from '../components/Form/Elements/FileInputExample';
import { CheckboxComponents } from '../components/Form/Elements/CheckboxComponents';
import { RadioButtons } from '../components/Form/Elements/RadioButtons';
import { ToggleSwitch } from '../components/Form/Elements/ToggleSwitch';
import { DropzoneComponent } from '../components/Form/Elements/DropZone';

const FormElements = () => {
    return (
        <div>
            <PageMeta title="Form Elements " description="Form Elements" />
            <PageBreadcrumb pageTitle="From Elements" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <DefaultInputs />
                    <SelectInputs />
                    <TextAreaInput />
                    <InputStates />
                </div>
                <div className="space-y-6">
                    <InputGroup />
                    <FileInputExample />
                    <CheckboxComponents />
                    <RadioButtons />
                    <ToggleSwitch />
                    <DropzoneComponent />
                </div>
            </div>
        </div>
    );
};

export default FormElements;
