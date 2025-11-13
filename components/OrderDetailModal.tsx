import React from 'react';

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

type OrderDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
};

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, onClose, order }) => {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Détails de la Commande <span className="text-[#FF9800]">#{order.id}</span></h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Client & Livraison</h3>
                        <p className="text-gray-600 font-medium">{order.customerName}</p>
                        <p className="text-gray-500">{order.customerEmail}</p>
                        <p className="text-gray-500 mt-2">{order.shippingAddress}</p>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Paiement & Statut</h3>
                        <p className="text-gray-600"><strong>Méthode:</strong> {order.paymentMethod}</p>
                        <p className="text-gray-600"><strong>Paiement:</strong> <span className="font-semibold text-green-600">{order.paymentStatus}</span></p>
                        <p className="text-gray-600"><strong>Commande:</strong> <span className="font-semibold text-blue-600">{order.orderStatus}</span></p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Articles de la Commande ({order.items.length})</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {order.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-md object-cover mr-4" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{(item.price * item.quantity).toFixed(2)} MAD</p>
                                    <p className="text-sm text-gray-500 text-right">{item.price.toFixed(2)} MAD each</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-6 pt-4 border-t flex justify-end items-center">
                    <span className="text-lg font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-[#4CAF50] ml-3">{order.total.toFixed(2)} MAD</span>
                </div>

            </div>
        </div>
    );
};

export default OrderDetailModal;
