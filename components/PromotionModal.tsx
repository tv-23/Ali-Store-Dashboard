import React, { useState, useEffect } from 'react';
import { Promotion } from './Promotions';
import { Product } from './Products';

type PromotionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (promotionData: Omit<Promotion, 'id'>) => void;
    promotion: Promotion | null;
    products: Product[];
};

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose, onSave, promotion, products }) => {
    const [formData, setFormData] = useState({
        title: '',
        discount: 0,
        startDate: '',
        endDate: '',
        productIds: [] as number[],
    });

    useEffect(() => {
        if (promotion) {
            setFormData({
                title: promotion.title,
                discount: promotion.discount,
                startDate: promotion.startDate,
                endDate: promotion.endDate,
                productIds: promotion.productIds || [],
            });
        } else {
            // Reset form for new promotion
            setFormData({ title: '', discount: 0, startDate: '', endDate: '', productIds: [] });
        }
    }, [promotion, isOpen]);


    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'discount' ? parseFloat(value) : value }));
    };

    const handleProductSelectionChange = (productId: number) => {
        setFormData(prev => {
            const newProductIds = prev.productIds.includes(productId)
                ? prev.productIds.filter(id => id !== productId)
                : [...prev.productIds, productId];
            return { ...prev, productIds: newProductIds };
        });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{promotion ? 'Modifier la Promotion' : 'Ajouter une Promotion'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre de la Promotion</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                        </div>
                        <div>
                             <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">Remise (%)</label>
                            <input type="number" name="discount" id="discount" value={formData.discount} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Date de Début</label>
                                <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Date de Fin</label>
                                <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Appliquer aux Produits</label>
                            <p className="text-xs text-gray-500 mb-2">Laisser vide pour appliquer à tous les produits.</p>
                            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2 space-y-2">
                                {products.map(product => (
                                    <div key={product.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`product-${product.id}`}
                                            checked={formData.productIds.includes(product.id)}
                                            onChange={() => handleProductSelectionChange(product.id)}
                                            className="h-4 w-4 accent-[#4CAF50] text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300 rounded"
                                        />
                                        <label htmlFor={`product-${product.id}`} className="ml-2 block text-sm text-gray-900">{product.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold">Annuler</button>
                        <button type="submit" className="px-6 py-2 text-white bg-[#4CAF50] hover:bg-green-600 rounded-lg font-semibold shadow-md">Enregistrer la Promotion</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PromotionModal;
