import { FormProps } from '@/presentation/types';

export const Form = ({ onSubmit, children, className }: FormProps) => {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault(); // Prevent default form submission
                onSubmit(event);
            }}
            className={` ${className}`} // Default spacing between form fields
        >
            {children}
        </form>
    );
};
