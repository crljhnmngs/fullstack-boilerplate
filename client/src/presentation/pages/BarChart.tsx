import { PageBreadcrumb } from '../components/Common/PageBreadCrumb';
import { PageMeta } from '../components/PageMeta';
import { ComponentCard } from '../components/Common/ComponentCard';
import { BarChartOne } from '../components/Charts/Bar/BarChartOne';
import { BarChartTwo } from '../components/Charts/Bar/BarChartTwo';

const BarChart = () => {
    return (
        <div>
            <PageMeta title="BarChart" description="BarChart" />
            <PageBreadcrumb pageTitle="Bar Chart" />
            <div className="space-y-6">
                <ComponentCard title="Bar Chart 1">
                    <BarChartOne />
                </ComponentCard>
                <ComponentCard title="Bar Chart 2">
                    <BarChartTwo />
                </ComponentCard>
            </div>
        </div>
    );
};

export default BarChart;
