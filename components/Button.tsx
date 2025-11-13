import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-[#4CAF50] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] disabled:opacity-50 transition-all duration-300"
        >
            {children}
        </button>
    );
};
