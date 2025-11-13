import React from 'react';

const RevenueChart = () => {
    const data = [
        { name: 'Janv', revenue: 4000 }, { name: 'Févr', revenue: 3000 },
        { name: 'Mars', revenue: 5000 }, { name: 'Avril', revenue: 4500 },
        { name: 'Mai', revenue: 6000 }, { name: 'Juin', revenue: 5500 },
        { name: 'Juil', revenue: 7000 }, { name: 'Août', revenue: 6500 },
    ];

    const chartWidth = 500;
    const chartHeight = 250;
    const padding = 30;
    
    const maxX = data.length - 1;
    const maxY = Math.max(...data.map(d => d.revenue)) * 1.1; // Add 10% padding

    const points = data.map((d, i) => {
        const x = (i / maxX) * (chartWidth - padding * 2) + padding;
        const y = chartHeight - padding - (d.revenue / maxY) * (chartHeight - padding * 2);
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = `${padding},${chartHeight - padding} ${points} ${chartWidth - padding},${chartHeight - padding}`;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h4 className="text-xl font-semibold text-gray-700 mb-1">Tendance des Revenus</h4>
            <p className="text-sm text-gray-500 mb-6">Les 8 derniers mois</p>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" aria-labelledby="revenue-chart-title">
                <title id="revenue-chart-title">Tendance des revenus au cours des 8 derniers mois.</title>
                {/* Y-axis grid lines */}
                {[0.25, 0.5, 0.75, 1].map(f => (
                    <line key={f} x1={padding} y1={chartHeight - padding - f * (chartHeight - padding*2)} x2={chartWidth - padding} y2={chartHeight - padding - f * (chartHeight - padding*2)} stroke="#e5e7eb" strokeWidth="1" />
                ))}
                
                {/* X-axis labels */}
                {data.map((d, i) => (
                    <text key={d.name} x={(i / maxX) * (chartWidth - padding * 2) + padding} y={chartHeight - 10} textAnchor="middle" fontSize="10" fill="#6b7280">{d.name}</text>
                ))}

                <polyline fill="none" stroke="#4CAF50" strokeWidth="2" points={points} />
                <polygon fill="#4CAF50" fillOpacity="0.1" points={areaPoints} />

                {/* Data points */}
                {data.map((d, i) => {
                    const x = (i / maxX) * (chartWidth - padding * 2) + padding;
                    const y = chartHeight - padding - (d.revenue / maxY) * (chartHeight - padding * 2);
                    return (
                        <g key={i} className="group">
                           <circle cx={x} cy={y} r="8" fill="#4CAF50" fillOpacity="0" />
                           <circle cx={x} cy={y} r="3" fill="#4CAF50" className="group-hover:r-5 transition-all" />
                           <text x={x} y={y - 10} textAnchor="middle" fontSize="10" fill="#111827" className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold">{d.revenue} MAD</text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default RevenueChart;
