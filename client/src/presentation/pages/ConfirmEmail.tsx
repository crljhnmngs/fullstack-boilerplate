import { useLocation } from 'react-router';
import { useConfirmEmail } from '../hooks/auth';
import { useEffect, useRef } from 'react';

export const ConfirmEmail = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    const token = params.get('token');

    const confirmEmail = useConfirmEmail();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        if (userId && token) {
            confirmEmail.handleConfirmEmail({ userId, token });
        }
    }, [userId, token]);

    return <></>;
};
