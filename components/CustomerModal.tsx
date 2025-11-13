import React, { useState } from 'react';
import { Customer } from './Customers';

type CustomerModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (customerData: Omit<Customer, 'id' | 'totalOrders' | 'registrationDate'>) => void;
};

const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un Nouveau Client</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                        </div>
                        <div>
                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Numéro de Téléphone</label>
                            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold">Annuler</button>
                        <button type="submit" className="px-6 py-2 text-white bg-[#4CAF50] hover:bg-green-600 rounded-lg font-semibold shadow-md">Enregistrer le Client</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerModal;
