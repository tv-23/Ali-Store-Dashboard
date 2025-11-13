import React, { useState } from 'react';
import OrderDetailModal from './OrderDetailModal';

type ProductInOrder = {
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
};

type Order = {
    id: string;
    customerName: string;
    customerEmail: string;
    date: string;
    total: number;
    paymentStatus: 'Payé' | 'Non Payé' | 'Remboursé';
    orderStatus: 'En attente' | 'Expédiée' | 'Livrée' | 'Annulée';
    shippingAddress: string;
    paymentMethod: string;
    items: ProductInOrder[];
};

const initialOrders: Order[] = [
    { id: '34567', customerName: 'Karim Alaoui', customerEmail: 'karim.a@example.com', date: '2024-07-20', total: 150.00, paymentStatus: 'Payé', orderStatus: 'Livrée', shippingAddress: '123 Avenue Hassan II, Casablanca, Maroc', paymentMethod: 'Carte de Crédit (**** 1234)', items: [{ id: 1, name: "Huile d'Argan", image: 'https://images.unsplash.com/photo-1556912173-3535a501a553?w=100', quantity: 1, price: 150.00 }] },
    { id: '34568', customerName: 'Fatima Zahra', customerEmail: 'fatima.z@example.com', date: '2024-07-20', total: 85.50, paymentStatus: 'Payé', orderStatus: 'Expédiée', shippingAddress: '456 Rue Mohammed V, Rabat, Maroc', paymentMethod: 'PayPal', items: [{ id: 3, name: 'Thé Sultan', image: 'https://images.unsplash.com/photo-1576092762269-bcc31f0f4a86?w=100', quantity: 3, price: 28.50 }] },
    { id: '34569', customerName: 'Amine El Fassi', customerEmail: 'amine.f@example.com', date: '2024-07-19', total: 205.20, paymentStatus: 'Payé', orderStatus: 'Livrée', shippingAddress: '789 Boulevard d\'Anfa, Casablanca, Maroc', paymentMethod: 'Carte de Crédit (**** 5678)', items: [{ id: 2, name: 'Couscous Dari', image: 'https://images.unsplash.com/photo-1596738363022-9d3d3a9a1d3a?w=100', quantity: 4, price: 51.30 }] },
    { id: '34570', customerName: 'Sofia Bennani', customerEmail: 'sofia.b@example.com', date: '2024-07-19', total: 45.00, paymentStatus: 'Remboursé', orderStatus: 'Annulée', shippingAddress: '101 Avenue des FAR, Marrakech, Maroc', paymentMethod: 'Carte de Crédit (**** 9012)', items: [{ id: 4, name: 'Ras El Hanout', image: 'https://images.unsplash.com/photo-1598020524434-933e75a6f2b4?w=100', quantity: 1, price: 45.00 }] },
    { id: '34571', customerName: 'Youssef Chraibi', customerEmail: 'youssef.c@example.com', date: '2024-07-18', total: 300.75, paymentStatus: 'Payé', orderStatus: 'En attente', shippingAddress: '212 Rue de la Liberté, Fès, Maroc', paymentMethod: 'Stripe', items: [{ id: 5, name: 'Amlou Beldi', image: 'https://images.unsplash.com/photo-1600358825227-248ef75294e9?w=100', quantity: 3, price: 100.25 }] },
];

const paymentStatusStyles: { [key: string]: string } = {
    'Payé': 'bg-green-100 text-green-800',
    'Non Payé': 'bg-yellow-100 text-yellow-800',
    'Remboursé': 'bg-gray-100 text-gray-800',
};

const orderStatusStyles: { [key: string]: string } = {
    'En attente': 'bg-orange-100 text-orange-800',
    'Expédiée': 'bg-blue-100 text-blue-800',
    'Livrée': 'bg-green-100 text-green-800',
    'Annulée': 'bg-red-100 text-red-800',
};

const Filters = ['Toutes', 'En attente', 'Expédiée', 'Livrée', 'Annulée'];

const Orders = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [activeFilter, setActiveFilter] = useState('Toutes');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = activeFilter === 'Toutes'
        ? orders
        : orders.filter(order => order.orderStatus === activeFilter);

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
    };

    return (
        <>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Gestion des Commandes</h3>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="mb-4 flex items-center space-x-2">
                    <p className="text-sm font-semibold text-gray-600">Filtrer par statut :</p>
                    {Filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${
                                activeFilter === filter
                                    ? 'bg-[#4CAF50] text-white shadow'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">ID Commande</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Client</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Paiement</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium text-gray-700">#{order.id}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{order.customerName}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                                    <td className="py-3 px-4 text-sm font-semibold text-gray-800">{order.total.toFixed(2)} MAD</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${paymentStatusStyles[order.paymentStatus]}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${orderStatusStyles[order.orderStatus]}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => handleViewDetails(order)} className="text-[#FF9800] hover:text-orange-700 font-semibold flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                            Voir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedOrder && (
                <OrderDetailModal 
                    isOpen={!!selectedOrder} 
                    onClose={() => setSelectedOrder(null)} 
                    order={selectedOrder} 
                />
            )}
        </>
    );
};

export default Orders;
