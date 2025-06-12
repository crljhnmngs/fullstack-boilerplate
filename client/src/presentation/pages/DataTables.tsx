import { PageMeta } from '../components/PageMeta';
import { PageBreadcrumb } from '../components/Common/PageBreadCrumb';
import { ComponentCard } from '../components/Common/ComponentCard';
import { DataTableOne } from '../components/Tables/DataTables/TableOne/DataTableOne';
import { DataTableTwo } from '../components/Tables/DataTables/TableTwo/DataTableTwo';
import { DataTableThree } from '../components/Tables/DataTables/TableThree/DataTableThree';

const DataTables = () => {
    return (
        <>
            <PageMeta title="Data Tables" description="Data Tables" />
            <PageBreadcrumb pageTitle="Data Tables" />
            <div className="space-y-5 sm:space-y-6">
                <ComponentCard title="Data Table 1">
                    <DataTableOne />
                </ComponentCard>
                <ComponentCard title="Data Table 2">
                    <DataTableTwo />
                </ComponentCard>
                <ComponentCard title="Data Table 3">
                    <DataTableThree />
                </ComponentCard>
            </div>
        </>
    );
};

export default DataTables;
