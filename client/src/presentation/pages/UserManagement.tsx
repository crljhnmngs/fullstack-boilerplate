import { PageMeta } from '../components/PageMeta';
import { PageBreadcrumb } from '../components/Common/PageBreadCrumb';
import { ComponentCard } from '../components/Common/ComponentCard';
import { UsersTable } from '../components/Tables/UsersTable/UsersTable';

const UserManagement = () => {
    return (
        <>
            <PageMeta title="User Management" description="User Management" />
            <PageBreadcrumb pageTitle="User Management" />
            <div className="space-y-5 sm:space-y-6">
                <ComponentCard title="Users  Table">
                    <UsersTable />
                </ComponentCard>
            </div>
        </>
    );
};

export default UserManagement;
