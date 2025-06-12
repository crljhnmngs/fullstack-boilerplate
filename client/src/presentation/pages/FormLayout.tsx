import { PageMeta } from '../components/PageMeta';
import { PageBreadcrumb } from '../components/Common/PageBreadCrumb';
import { BasicForm } from '../components/Form/Forms/BasicForm';
import { FormOne } from '../components/Form/Forms/FormOne';
import { FormWithIcon } from '../components/Form/Forms/FormWithIcon';
import { FormTwo } from '../components/Form/Forms/FormTwo';

const FormLayout = () => {
    return (
        <div>
            <PageMeta title="Form Layout" description="Form Layout" />
            <PageBreadcrumb pageTitle="From Layouts" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-5 sm:space-y-6">
                    <BasicForm />
                    <FormOne />
                </div>
                <div className="space-y-6">
                    <FormWithIcon />
                    <FormTwo />
                </div>
            </div>
        </div>
    );
};

export default FormLayout;
