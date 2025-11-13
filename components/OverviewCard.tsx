import React from 'react';

interface OverviewCardProps {
    title: string;
    value: string;
    // Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
    icon: React.ReactElement;
    change: string;
    changeType: 'increase' | 'decrease';
    bgColor: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, icon, change, changeType, bgColor }) => {
    const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
    const changeIcon = changeType === 'increase' ? '↑' : '↓';

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <p className={`text-sm font-semibold ${changeColor}`}>
                    <span>{changeIcon}</span> {change} vs last month
                </p>
            </div>
            <div className={`p-4 rounded-full ${bgColor}`}>
                {icon}
            </div>
        </div>
    );
};

export default OverviewCard;