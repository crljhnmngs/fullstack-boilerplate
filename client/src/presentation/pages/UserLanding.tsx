import { useAuthStore } from '@/application/store/authStore';
import { PageMeta } from '../components/PageMeta';

const UserLanding = () => {
    const { user } = useAuthStore();
    return (
        <>
            <PageMeta
                title="User Landing"
                description="This is Admin Dashboard"
            />
            <div className="flex justify-center">
                <h1>
                    Welcome {user.firstname} {user.lastname}
                </h1>
            </div>
        </>
    );
};

export default UserLanding;
