import { useEffect, useMemo } from 'react';
import logo from '../../assets/icons/logo.png';
import { useUserStore } from '../../store/user/useUserStore';
import { getRandomUsers } from '../../service/user/randomUserService';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';

export const Header = () => {
    const setUsers = useUserStore((state) => state.setUsers);
    const users = useUserStore((state) => state.users);

    const { data, isLoading } = useQuery({
        queryKey: ['randomUser'],
        queryFn: () => getRandomUsers({ results: 1 }),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data, setUsers]);

    const user = useMemo(() => users[0], [users]);

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
                </nav>
                <div className="h-full flex items-center gap-5">
                    {isLoading ? (
                        <p className="text-white font-medium text-lg">
                            Loading...
                        </p>
                    ) : (
                        <>
                            <p className="text-customColor font-medium text-lg">
                                {user?.name.first} {user?.name.last}
                            </p>
                            <img
                                src={user?.picture.thumbnail}
                                className="rounded-full w-10 h-10 object-cover"
                                alt={`${user?.name.first} ${user?.name.last}`}
                            />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
