import { useEffect, useMemo, useState } from 'react';
import logo from '@/presentation/assets/icons/logo.png';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';
import { useRandomUserStore } from '@/application/store/randomUserStore';
import { RandomUserUseCases } from '@/application/useCases/randomUserUseCase';
import { isAuthenticated } from '@/infrastructure/authStorage';
import { useAuthStore } from '@/application/store/authStore';
import { useGetUserProfile } from '@/presentation/hooks/user';
import defaultImage from '../../assets/images/defaultImage.png';
import { useLogoutUser } from '@/presentation/hooks/auth';

export const Header = () => {
    const setUsers = useRandomUserStore((state) => state.setUsers);
    const users = useRandomUserStore((state) => state.users);
    const [name, setName] = useState<string>();
    const { user } = useAuthStore();
    const { userProfile, isProfileLoading } = useGetUserProfile();
    const { handleUserlogout } = useLogoutUser();

    const { data, isLoading } = useQuery({
        queryKey: ['randomUser'],
        queryFn: () => RandomUserUseCases.getRandomUser({ results: 1 }),
        refetchOnWindowFocus: false,
        enabled: !isAuthenticated(),
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data, setUsers]);

    const randomUser = useMemo(() => users[0], [users]);

    const handleLogout = () => {
        handleUserlogout();
    };

    useEffect(() => {
        if (isAuthenticated()) {
            setName(user.name);
        } else {
            setName(randomUser?.name?.first + ' ' + randomUser?.name?.last);
        }
    }, [randomUser, user]);

    return (
        <header className="w-full h-[10%] bg-[#2A57A5] flex justify-between items-center px-10">
            <div className="h-full flex items-center">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="flex items-center gap-10">
                <nav className="flex gap-7 text-xl text-white underline">
                    <NavLink to="/" end>
                        Home
                    </NavLink>
                    <NavLink to="/sales" end>
                        Sales
                    </NavLink>
                    {isAuthenticated() ? (
                        <NavLink to="/login" onClick={handleLogout} end>
                            Logout
                        </NavLink>
                    ) : (
                        <NavLink to="/login" end>
                            Login
                        </NavLink>
                    )}
                </nav>
                <div className="h-full flex items-center gap-5">
                    {isLoading || isProfileLoading ? (
                        <p className="text-white font-medium text-lg">
                            Loading...
                        </p>
                    ) : (
                        <>
                            <p className="text-customColor font-medium text-lg">
                                {name}
                            </p>
                            <img
                                src={
                                    isAuthenticated()
                                        ? userProfile?.profileImage ||
                                          defaultImage
                                        : randomUser?.picture?.thumbnail ||
                                          defaultImage
                                }
                                className="rounded-full w-10 h-10 object-cover"
                                alt="User Image"
                            />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
