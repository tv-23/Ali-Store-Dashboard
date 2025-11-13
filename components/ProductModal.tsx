import React, { useState, useEffect } from 'react';

type Product = {
    id: number;
    name: string;
    image: string;
    category: string;
    stock: number;
    price: number;
    status: 'En Stock' | 'Stock Faible' | 'Rupture de Stock';
};

type ProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (productData: Omit<Product, 'id' | 'status'>) => void;
    product: Product | null;
};

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: 0,
        stock: 0,
        image: ''
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: 'Un produit de haute qualité pour un usage quotidien.', // Mock description
                category: product.category,
                price: product.price,
                stock: product.stock,
                image: product.image
            });
            setImagePreview(product.image);
        } else {
            setFormData({ name: '', description: '', category: '', price: 0, stock: 0, image: '' });
            setImagePreview(null);
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setFormData(prev => ({ ...prev, image: result }));
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{product ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom du Produit</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                        </div>
                        <div>
                             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                        </div>
                        <div className="md:col-span-2">
                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"></textarea>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Prix (MAD)</label>
                            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} step="0.01" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                        </div>
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" required />
                        </div>
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 mb-1">Image du Produit</label>
                             <div className="mt-1 flex items-center">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-md object-cover mr-4" />
                                ) : (
                                    <div className="w-20 h-20 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                )}
                                <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-8">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold">Annuler</button>
                        <button type="submit" className="px-6 py-2 text-white bg-[#4CAF50] hover:bg-green-600 rounded-lg font-semibold shadow-md">Enregistrer le Produit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
