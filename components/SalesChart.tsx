import React from 'react';

// FIX: Define props with an interface and use React.FC to correctly type the component.
// This allows React's special 'key' prop to be used without TypeScript errors.
interface ChartBarProps {
    height: string;
    label: string;
}

const ChartBar: React.FC<ChartBarProps> = ({ height, label }) => (
    <div className="flex-1 flex flex-col items-center justify-end">
        <div 
            className="w-8 bg-[#4CAF50] rounded-t-md hover:bg-green-600 transition-colors" 
            style={{ height }}
            aria-label={`Ventes pour ${label}`}
        ></div>
        <span className="mt-2 text-xs text-gray-500">{label}</span>
    </div>
);


const SalesChart = () => {
    const salesData = [
        { label: 'Janv', value: '65%' },
        { label: 'Févr', value: '59%' },
        { label: 'Mars', value: '80%' },
        { label: 'Avril', value: '81%' },
        { label: 'Mai', value: '56%' },
        { label: 'Juin', value: '55%' },
        { label: 'Juil', value: '40%' },
        { label: 'Août', value: '60%' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h4 className="text-xl font-semibold text-gray-700 mb-1">Activité des Ventes</h4>
            <p className="text-sm text-gray-500 mb-6">Les 8 derniers mois</p>
            <div className="flex items-end h-64 space-x-4" role="figure" aria-label="Graphique des données de ventes">
                {salesData.map(data => <ChartBar key={data.label} height={data.value} label={data.label} />)}
            </div>
        </div>
    );
};

export default SalesChart;