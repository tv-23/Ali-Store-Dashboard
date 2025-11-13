import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, placeholder, required = false }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
            />
        </div>
    );
};
