import React from 'react';

// FIX: Define props with an interface and use React.FC to correctly type the component.
// This allows React's special 'key' prop to be used without TypeScript errors.
interface LegendItemProps {
    color: string;
    text: string;
    percentage: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, text, percentage }) => (
    <div className="flex items-center text-sm text-gray-600">
        <span className={`w-3 h-3 mr-2 rounded-full`} style={{ backgroundColor: color }}></span>
        <span>{text}</span>
        <span className="ml-auto font-semibold">{percentage}</span>
    </div>
);

const PaymentMethodsChart = () => {
    const methods = [
        { name: 'Carte de Crédit', color: '#4CAF50', percentage: '55%' },
        { name: 'PayPal', color: '#FF9800', percentage: '30%' },
        { name: 'Stripe', color: '#2196F3', percentage: '10%' },
        { name: 'Autre', color: '#795548', percentage: '5%' },
    ];
    
    const gradient = `conic-gradient(#4CAF50 0% 55%, #FF9800 55% 85%, #2196F3 85% 95%, #795548 95% 100%)`;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h4 className="text-xl font-semibold text-gray-700 mb-6">Méthodes de Paiement</h4>
            <div className="flex flex-col md:flex-row items-center justify-around">
                <div 
                    className="w-40 h-40 rounded-full mb-6 md:mb-0 transform hover:scale-110 transition-transform"
                    style={{ background: gradient }}
                    role="img"
                    aria-label="Diagramme circulaire des méthodes de paiement"
                ></div>
                <div className="w-full md:w-1/2 space-y-3">
                    {methods.map(cat => (
                        <LegendItem key={cat.name} color={cat.color} text={cat.name} percentage={cat.percentage} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodsChart;