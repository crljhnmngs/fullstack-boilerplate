import { useAuthStore } from '@/application/store/authStore';
import { Header } from '../components/Header';

export const Dashboard = () => {
    const { user, accessToken } = useAuthStore();
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <Header />
            <div className="flex-1 flex flex-col justify-center  items-center">
                <h1>User Dashboard</h1>
                <h1>Name: {user.name}</h1>
                <h1>Email: {user.email}</h1>
                <h1>AccessToken: {accessToken}</h1>
            </div>
        </div>
    );
};
