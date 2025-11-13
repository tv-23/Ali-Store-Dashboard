import React from 'react';

const statusStyles: { [key: string]: string } = {
    'Complétée': 'bg-green-100 text-green-800',
    'En attente': 'bg-orange-100 text-orange-800',
    'Annulée': 'bg-red-100 text-red-800',
};

const OrderRow = ({ orderId, customer, date, total, status }: { orderId: string, customer: string, date: string, total: string, status: string }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="py-3 px-4 text-sm font-medium text-gray-700">#{orderId}</td>
        <td className="py-3 px-4 text-sm text-gray-600">{customer}</td>
        <td className="py-3 px-4 text-sm text-gray-600">{date}</td>
        <td className="py-3 px-4 text-sm font-semibold text-gray-800">{total}</td>
        <td className="py-3 px-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
                {status}
            </span>
        </td>
    </tr>
);

const RecentOrdersTable = () => {
    const orders = [
        { id: '34567', customer: 'Karim Alaoui', date: '2024-07-20', total: '150.00 MAD', status: 'Complétée' },
        { id: '34568', customer: 'Fatima Zahra', date: '2024-07-20', total: '85.50 MAD', status: 'En attente' },
        { id: '34569', customer: 'Amine El Fassi', date: '2024-07-19', total: '205.20 MAD', status: 'Complétée' },
        { id: '34570', customer: 'Sofia Bennani', date: '2024-07-19', total: '45.00 MAD', status: 'Annulée' },
        { id: '34571', customer: 'Youssef Chraibi', date: '2024-07-18', total: '300.75 MAD', status: 'Complétée' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Commandes Récentes</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">ID Commande</th>
                            <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Client</th>
                            <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                            <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                            <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <OrderRow key={order.id} orderId={order.id} customer={order.customer} date={order.date} total={order.total} status={order.status} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrdersTable;
