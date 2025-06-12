import { PageBreadcrumb } from '../components/Common/PageBreadCrumb';
import { PageMeta } from '../components/PageMeta';
import { ComponentCard } from '../components/Common/ComponentCard';
import { PieChartOne } from '../components/Charts/Pie/PieChartOne';
import { PieChartTwo } from '../components/Charts/Pie/PieChartTwo';

const PieChart = () => {
    return (
        <div>
            <PageMeta
                title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Pie Chart" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <ComponentCard title="Bar Chart 1">
                    <PieChartOne />
                </ComponentCard>
                <ComponentCard title="Bar Chart 2">
                    <PieChartTwo />
                </ComponentCard>
            </div>
        </div>
    );
};

export default PieChart;
