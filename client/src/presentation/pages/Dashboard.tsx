import { PageMeta } from '../components/PageMeta';
import {
    DemographicCard,
    EcommerceMetrics,
    MonthlySalesChart,
    MonthlyTarget,
    RecentOrders,
    StatisticsChart,
} from '../components/Dashboard';

const Dashboard = () => {
    return (
        <>
            <PageMeta
                title=" Admin Dashboard"
                description="This is Admin Dashboard"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <EcommerceMetrics />

                    <MonthlySalesChart />
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <MonthlyTarget />
                </div>

                <div className="col-span-12">
                    <StatisticsChart />
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <DemographicCard />
                </div>

                <div className="col-span-12 xl:col-span-7">
                    <RecentOrders />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
