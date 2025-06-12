import { PageMeta } from '../components/PageMeta';
import { PageBreadcrumb } from '../components/Common/PageBreadCrumb';
import { ComponentCard } from '../components/Common/ComponentCard';
import { BasicTableOne } from '../components/Tables/BasicTables/BasicTableOne';
import { BasicTableTwo } from '../components/Tables/BasicTables/BasicTableTwo';
import { BasicTableThree } from '../components/Tables/BasicTables/BasicTableThree';
import { BasicTableFour } from '../components/Tables/BasicTables/BasicTableFour';
import { BasicTableFive } from '../components/Tables/BasicTables/BasicTableFive';

const BasicTables = () => {
    return (
        <>
            <PageMeta title="Basic Tables" description="Basic Tables" />
            <PageBreadcrumb pageTitle="Basic Tables" />
            <div className="space-y-6">
                <ComponentCard title="Basic Table 1">
                    <BasicTableOne />
                </ComponentCard>
                <ComponentCard title="Basic Table 2">
                    <BasicTableTwo />
                </ComponentCard>

                <ComponentCard title="Basic Table 3">
                    <BasicTableThree />
                </ComponentCard>

                <ComponentCard title="Basic Table 4">
                    <BasicTableFour />
                </ComponentCard>
                <ComponentCard title="Basic Table 5">
                    <BasicTableFive />
                </ComponentCard>
            </div>
        </>
    );
};

export default BasicTables;
