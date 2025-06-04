import { useLocation } from 'react-router';
import { useResendVerification } from '../hooks/auth';
import { useEffect, useRef } from 'react';

export const ResendVerification = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId') ?? undefined;
    const email = params.get('email') ?? undefined;

    const resendVerification = useResendVerification();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        if (userId || email) {
            resendVerification.resendVerification({ userId, email });
        }
    }, [userId, email]);

    return <></>;
};
