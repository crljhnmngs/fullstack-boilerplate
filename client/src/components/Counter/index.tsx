import React from 'react';
import { useCounter } from '../../store/counter/useCounter';

export const Counter = () => {
    const increment = useCounter((state) => state.increment);
    const decrement = useCounter((state) => state.decrement);
    const reset = useCounter((state) => state.reset);
    const count = useCounter((state) => state.count);

    const isDisabled = count === 0;

    return (
        <div className="h-[90%] flex items-center justify-center flex-col gap-5">
            <p className="text-2xl font-bold">Counter: {count}</p>
            <div className="flex gap-4">
                <button
                    className="px-4 py-2 w-28 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={increment}
                >
                    Add
                </button>
                <button
                    className={`px-4 py-2 w-28 rounded text-white ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                    onClick={decrement}
                    disabled={isDisabled}
                    aria-disabled={isDisabled}
                >
                    Subtract
                </button>
            </div>
            <button
                className={`px-4 py-2 w-28 rounded text-white ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                onClick={reset}
                disabled={isDisabled}
                aria-disabled={isDisabled}
            >
                Reset
            </button>
        </div>
    );
};
