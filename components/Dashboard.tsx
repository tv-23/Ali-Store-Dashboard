import React from 'react';
import OverviewCard from './OverviewCard';
import SalesChart from './SalesChart';
import CategoryChart from './CategoryChart';
import RecentOrdersTable from './RecentOrdersTable';

const Dashboard = () => {
    return (
        <>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Bon retour, Admin !</h3>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <OverviewCard
                    title="Ventes Totales"
                    value="15,302 MAD"
                    change="+6.2%"
                    changeType="increase"
                    icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
                    bgColor="bg-[#4CAF50]"
                />
                <OverviewCard
                    title="Nouvelles Commandes"
                    value="1,280"
                    change="+12.5%"
                    changeType="increase"
                    icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    bgColor="bg-[#FF9800]"
                />
                <OverviewCard
                    title="Clients"
                    value="8,540"
                    change="-1.8%"
                    changeType="decrease"
                    icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    bgColor="bg-blue-500"
                />
                <OverviewCard
                    title="Revenu"
                    value="98,450 MAD"
                    change="+20.1%"
                    changeType="increase"
                    icon={<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                    bgColor="bg-indigo-500"
                />
            </div>

            <div className="grid gap-6 mb-8 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <SalesChart />
                </div>
                 <div className="lg:col-span-2">
                    <CategoryChart />
                </div>
            </div>

            <RecentOrdersTable />
        </>
    );
};

export default Dashboard;
