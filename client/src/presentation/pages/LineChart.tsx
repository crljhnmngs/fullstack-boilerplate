import { PageBreadcrumb } from '../components/Common/PageBreadCrumb';
import { PageMeta } from '../components/PageMeta';
import { ComponentCard } from '../components/Common/ComponentCard';
import { LineChartOne } from '../components/Charts/Line/LineChartOne';
import { LineChartTwo } from '../components/Charts/Line/LineChartTwo';
import { LineChartThree } from '../components/Charts/Line/LineChartThree';

const LineChart = () => {
    return (
        <>
            <PageMeta title="Line Chart" description="Line Chart" />
            <PageBreadcrumb pageTitle="Line Chart" />
            <div className="space-y-6">
                <ComponentCard title="Line Chart 1">
                    <LineChartOne />
                </ComponentCard>
                <ComponentCard title="Line Chart 2">
                    <LineChartTwo />
                </ComponentCard>
                <ComponentCard title="Line Chart 3">
                    <LineChartThree />
                </ComponentCard>
            </div>
        </>
    );
};

export default LineChart;
