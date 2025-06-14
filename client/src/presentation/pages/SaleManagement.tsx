import { PageMeta } from '../components/PageMeta';
import { PageBreadcrumb } from '../components/Common/PageBreadCrumb';
import { ComponentCard } from '../components/Common/ComponentCard';
import { SalesTable } from '../components/Tables/SalesTable/SalesTable';

const SaleManagement = () => {
    return (
        <>
            <PageMeta title="Sale Management" description="Sale Management" />
            <PageBreadcrumb pageTitle="Sale Management" />
            <div className="space-y-5 sm:space-y-6">
                <ComponentCard title="Sales Table">
                    <SalesTable />
                </ComponentCard>
            </div>
        </>
    );
};

export default SaleManagement;
