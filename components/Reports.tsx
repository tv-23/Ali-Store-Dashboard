import React from 'react';
import OverviewCard from './OverviewCard';
import RevenueChart from './RevenueChart';
import TopCategoriesChart from './TopCategoriesChart';
import PaymentMethodsChart from './PaymentMethodsChart';

const Reports = () => {
    return (
        <>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Rapports & Analyses</h3>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                <OverviewCard
                    title="Revenu Total"
                    value="125,830 MAD"
                    change="+15.7%"
                    changeType="increase"
                    icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                    bgColor="bg-[#4CAF50]"
                />
                <OverviewCard
                    title="Valeur Moyenne Commande"
                    value="98.30 MAD"
                    change="-2.1%"
                    changeType="decrease"
                    icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
                    bgColor="bg-[#FF9800]"
                />
                <OverviewCard
                    title="Total Clients"
                    value="8,547"
                    change="+352"
                    changeType="increase"
                    icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    bgColor="bg-blue-500"
                />
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
                <RevenueChart />
            </div>

            <div className="grid gap-6 mb-8 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <TopCategoriesChart />
                </div>
                 <div className="lg:col-span-2">
                    <PaymentMethodsChart />
                </div>
            </div>

        </>
    );
};

export default Reports;
