import React, { useState } from 'react';
import PromotionModal from './PromotionModal';
import { initialProducts, Product } from './Products';

export type Promotion = {
    id: number;
    title: string;
    discount: number;
    startDate: string;
    endDate: string;
    productIds: number[];
};

const initialPromotions: Promotion[] = [
    { id: 1, title: 'Promo Ramadan', discount: 20, startDate: '2024-03-10', endDate: '2024-04-09', productIds: [] },
    { id: 2, title: 'Spécial Aïd', discount: 15, startDate: '2024-06-10', endDate: '2024-06-17', productIds: [3, 5] },
    { id: 3, title: 'Offres d\'Automne', discount: 30, startDate: '2024-10-01', endDate: '2024-10-31', productIds: [1, 2] },
    { id: 4, title: 'Déstockage de Printemps', discount: 50, startDate: '2024-04-01', endDate: '2024-04-15', productIds: [] },
];

const getPromotionStatus = (startDate: string, endDate: string): { text: 'Active' | 'À venir' | 'Expirée'; className: string } => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the whole end day

    if (now < start) {
        return { text: 'À venir', className: 'bg-orange-100 text-orange-800' };
    } else if (now >= start && now <= end) {
        return { text: 'Active', className: 'bg-green-100 text-green-800' };
    } else {
        return { text: 'Expirée', className: 'bg-gray-200 text-gray-700' };
    }
};

const Promotions = () => {
    const [promotions, setPromotions] = useState(initialPromotions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

    const handleAddPromotion = () => {
        setEditingPromotion(null);
        setIsModalOpen(true);
    };

    const handleEditPromotion = (promotion: Promotion) => {
        setEditingPromotion(promotion);
        setIsModalOpen(true);
    };

    const handleSavePromotion = (promotionData: Omit<Promotion, 'id'>) => {
        if (editingPromotion) {
            setPromotions(promotions.map(p => p.id === editingPromotion.id ? { ...p, ...promotionData } : p));
        } else {
            const newPromotion: Promotion = {
                ...promotionData,
                id: Date.now(),
            };
            setPromotions([newPromotion, ...promotions]);
        }
        setIsModalOpen(false);
        setEditingPromotion(null);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Promotions</h3>
                <button
                    onClick={handleAddPromotion}
                    className="px-5 py-3 text-white bg-[#FF9800] hover:bg-orange-600 rounded-lg shadow-md font-bold transition-transform transform hover:scale-105"
                >
                    + Ajouter une Promotion
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Titre</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Remise</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Produits</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date de Début</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date de Fin</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.map(promo => {
                                const status = getPromotionStatus(promo.startDate, promo.endDate);
                                const promoProducts = promo.productIds
                                    .map(id => initialProducts.find(p => p.id === id)?.name)
                                    .filter(Boolean);
                                return (
                                <tr key={promo.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium text-gray-700">{promo.title}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600 font-semibold">{promo.discount}%</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {promoProducts.length > 0 ? promoProducts.join(', ') : <span className="italic text-gray-500">Tous les produits</span>}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{promo.startDate}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{promo.endDate}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.className}`}>
                                            {status.text}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-3">
                                            <button onClick={() => handleEditPromotion(promo)} className="text-blue-500 hover:text-blue-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <PromotionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSavePromotion}
                    promotion={editingPromotion}
                    products={initialProducts}
                />
            )}
        </>
    );
};

export default Promotions;
