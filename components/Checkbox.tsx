import React from 'react';

interface CheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange }) => {
    return (
        <div className="flex items-center">
            <input
                id={id}
                name={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 accent-[#4CAF50] text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300 rounded"
            />
            <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
                {label}
            </label>
        </div>
    );
};
