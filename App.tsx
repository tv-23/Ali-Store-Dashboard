import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Orders from './components/Orders';
import Customers from './components/Customers';
import Promotions from './components/Promotions';
import Reports from './components/Reports';
import Settings from './components/Settings';

function App() {
    const [activePage, setActivePage] = useState('Tableau de bord');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (activePage) {
            case 'Tableau de bord':
                return <Dashboard />;
            case 'Produits':
                return <Products />;
            case 'Commandes':
                return <Orders />;
            case 'Clients':
                return <Customers />;
            case 'Promotions':
                return <Promotions />;
            case 'Rapports':
                return <Reports />;
            case 'Paramètres':
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };
    
    const handlePageChange = (page: string) => {
        setActivePage(page);
        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    };


    return (
        <div className="flex h-screen bg-slate-100 font-sans">
            <Sidebar 
                activePage={activePage} 
                onPageChange={handlePageChange} 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
                    <div className="container mx-auto px-6 py-8">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;