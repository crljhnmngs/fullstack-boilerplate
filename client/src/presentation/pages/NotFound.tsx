import { ROUTES } from '@/lib/routes';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(ROUTES.HOME);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-lg flex items-center flex-col text-notFound -ml-9 -mt-7">
                <div className="text-[19px] xs:text-[17px] tracking-widest text-gray-900 font-medium pl-16 uppercase">
                    <h3>oops! page not found</h3>
                </div>
                <div className="-mt-6 xs:-mt-7">
                    <h1 className="font-montserrat font-black text-[270px] xs:text-[250px] leading-none tracking-small xs:tracking-tightest notFound">
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                    </h1>
                </div>
                <div className="-mt-4 text-xl xs:text-[19px] font-medium uppercase text-center pl-8">
                    <h3>
                        we are sorry, but the page you requested was not found
                    </h3>
                    <h3
                        className="text-lg underline text-blue-600 cursor-pointer"
                        onClick={handleGoBack}
                    >
                        Back
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
