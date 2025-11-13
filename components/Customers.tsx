import React, { useState, useMemo } from 'react';
import CustomerModal from './CustomerModal';

export type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    totalOrders: number;
    registrationDate: string;
};

const initialCustomers: Customer[] = [
    { id: 1, name: 'Karim Alaoui', email: 'karim.a@example.com', phone: '0661-123456', totalOrders: 5, registrationDate: '2023-01-15' },
    { id: 2, name: 'Fatima Zahra', email: 'fatima.z@example.com', phone: '0662-234567', totalOrders: 8, registrationDate: '2023-02-20' },
    { id: 3, name: 'Amine El Fassi', email: 'amine.f@example.com', phone: '0663-345678', totalOrders: 2, registrationDate: '2023-03-10' },
    { id: 4, name: 'Sofia Bennani', email: 'sofia.b@example.com', phone: '0664-456789', totalOrders: 12, registrationDate: '2022-11-05' },
    { id: 5, name: 'Youssef Chraibi', email: 'youssef.c@example.com', phone: '0665-567890', totalOrders: 1, registrationDate: '2024-05-01' },
    { id: 6, name: 'Leila Saadi', email: 'leila.s@example.com', phone: '0666-678901', totalOrders: 20, registrationDate: '2021-07-22' },
    { id: 7, name: 'Mehdi Tazi', email: 'mehdi.t@example.com', phone: '0667-789012', totalOrders: 3, registrationDate: '2024-06-18' },
];

const ITEMS_PER_PAGE = 5;

const Customers = () => {
    const [customers, setCustomers] = useState(initialCustomers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredCustomers = useMemo(() =>
        customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        ), [customers, searchTerm]);

    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredCustomers, currentPage]);
    
    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

    const handleSaveCustomer = (customerData: Omit<Customer, 'id' | 'totalOrders' | 'registrationDate'>) => {
        const newCustomer: Customer = {
            id: Date.now(),
            ...customerData,
            totalOrders: 0,
            registrationDate: new Date().toISOString().split('T')[0],
        };
        setCustomers([newCustomer, ...customers]);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Clients</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-5 py-3 text-white bg-[#FF9800] hover:bg-orange-600 rounded-lg shadow-md font-bold transition-transform transform hover:scale-105"
                >
                    + Ajouter un Client
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="mb-4">
                     <input
                        type="text"
                        placeholder="Rechercher par nom ou email..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full md:w-1/3 py-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#4CAF50] focus:ring-[#4CAF50] focus:ring-opacity-40 focus:outline-none"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Nom</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Commandes Totales</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Inscrit le</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCustomers.map(customer => (
                                <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium text-gray-700">{customer.name}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        <div>{customer.email}</div>
                                        <div className="text-xs text-gray-500">{customer.phone}</div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600 font-semibold">{customer.totalOrders}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{customer.registrationDate}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-3">
                                            <button className="text-blue-500 hover:text-blue-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600">
                        Affichage de {paginatedCustomers.length} sur {filteredCustomers.length} clients
                    </span>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Préc</button>
                        <span className="text-sm font-semibold">{currentPage} / {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Suiv</button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <CustomerModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveCustomer}
                />
            )}
        </>
    );
};

export default Customers;
