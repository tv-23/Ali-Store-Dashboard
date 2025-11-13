import React from 'react';

const TopCategoriesChart = () => {
    const categories = [
        { name: 'Épices', sales: 45000, color: 'bg-[#4CAF50]' },
        { name: 'Huiles', sales: 32000, color: 'bg-[#FF9800]' },
        { name: 'Couscous & Pâtes', sales: 28000, color: 'bg-blue-500' },
        { name: 'Thé & Infusions', sales: 15000, color: 'bg-indigo-500' },
        { name: 'Produits du Terroir', sales: 9000, color: 'bg-purple-500' },
    ];
    
    const maxSales = Math.max(...categories.map(c => c.sales));

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Catégories les Plus Vendues</h4>
            <div className="space-y-4">
                {categories.map(cat => (
                    <div key={cat.name} className="flex items-center group">
                        <span className="w-1/3 text-sm font-medium text-gray-600 truncate">{cat.name}</span>
                        <div className="w-2/3 bg-gray-200 rounded-full h-5">
                            <div
                                className={`${cat.color} h-5 rounded-full flex items-center justify-end pr-2 transition-all duration-500`}
                                style={{ width: `${(cat.sales / maxSales) * 100}%` }}
                            >
                               <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    {(cat.sales / 1000).toFixed(1)}k MAD
                               </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCategoriesChart;
