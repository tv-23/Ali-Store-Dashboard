import React from 'react';

const LegendItem = ({ color, text, percentage }: { color: string, text: string, percentage: string }) => (
    <div className="flex items-center text-sm text-gray-600">
        <span className={`w-3 h-3 mr-2 rounded-full`} style={{ backgroundColor: color }}></span>
        <span>{text}</span>
        <span className="ml-auto font-semibold">{percentage}</span>
    </div>
);

const CategoryChart = () => {
    const categories = [
        { name: 'Épices', color: '#4CAF50', percentage: '35%' },
        { name: 'Huiles', color: '#FF9800', percentage: '25%' },
        { name: 'Couscous & Pâtes', color: '#2196F3', percentage: '20%' },
        { name: 'Thé & Infusions', color: '#9C27B0', percentage: '15%' },
        { name: 'Conserves', color: '#795548', percentage: '5%' },
    ];
    
    // Creates a conic gradient string for the pie chart
    const gradient = `conic-gradient(#4CAF50 0% 35%, #FF9800 35% 60%, #2196F3 60% 80%, #9C27B0 80% 95%, #795548 95% 100%)`;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h4 className="text-xl font-semibold text-gray-700 mb-6">Catégories Populaires</h4>
            <div className="flex flex-col md:flex-row items-center justify-around">
                <div 
                    className="w-40 h-40 rounded-full mb-6 md:mb-0"
                    style={{ background: gradient }}
                    role="img"
                    aria-label="Diagramme circulaire des catégories de produits"
                ></div>
                <div className="w-full md:w-1/2 space-y-3">
                    {categories.map(cat => (
                        <LegendItem key={cat.name} color={cat.color} text={cat.name} percentage={cat.percentage} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryChart;
