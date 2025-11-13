import React, { useState } from 'react';
import ProductModal from './ProductModal';

export type Product = {
    id: number;
    name: string;
    image: string;
    category: string;
    stock: number;
    price: number;
    status: 'En Stock' | 'Stock Faible' | 'Rupture de Stock';
};

export const initialProducts: Product[] = [
    { id: 1, name: "Huile d'Argan", image: 'https://images.unsplash.com/photo-1556912173-3535a501a553?w=200', category: 'Huiles', stock: 25, price: 150.00, status: 'En Stock' },
    { id: 2, name: 'Couscous Dari', image: 'https://images.unsplash.com/photo-1596738363022-9d3d3a9a1d3a?w=200', category: 'Couscous & Pâtes', stock: 5, price: 25.50, status: 'Stock Faible' },
    { id: 3, name: 'Thé Sultan', image: 'https://images.unsplash.com/photo-1576092762269-bcc31f0f4a86?w=200', category: 'Thé & Infusions', stock: 0, price: 15.00, status: 'Rupture de Stock' },
    { id: 4, name: 'Ras El Hanout', image: 'https://images.unsplash.com/photo-1598020524434-933e75a6f2b4?w=200', category: 'Épices', stock: 50, price: 45.99, status: 'En Stock' },
    { id: 5, name: 'Amlou Beldi', image: 'https://images.unsplash.com/photo-1600358825227-248ef75294e9?w=200', category: 'Produits du Terroir', stock: 12, price: 80.00, status: 'En Stock' },
];

const statusStyles: { [key: string]: string } = {
    'En Stock': 'bg-green-100 text-green-800',
    'Stock Faible': 'bg-orange-100 text-orange-800',
    'Rupture de Stock': 'bg-red-100 text-red-800',
};

const Products = () => {
    const [products, setProducts] = useState(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleSaveProduct = (productData: Omit<Product, 'id' | 'status'> & { id?: number }) => {
        const status: Product['status'] = productData.stock === 0 ? 'Rupture de Stock' : productData.stock < 10 ? 'Stock Faible' : 'En Stock';
        
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData, status } : p));
        } else {
            const newProduct: Product = {
                ...productData,
                id: Date.now(),
                image: productData.image || 'https://placehold.co/200x200/png',
                status,
            };
            setProducts([newProduct, ...products]);
        }
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Tous les Produits</h3>
                <button
                    onClick={handleAddProduct}
                    className="px-5 py-3 text-white bg-[#FF9800] hover:bg-orange-600 rounded-lg shadow-md font-bold transition-transform transform hover:scale-105"
                >
                    + Ajouter un Produit
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="mb-4">
                     <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        className="w-full md:w-1/3 py-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#4CAF50] focus:ring-[#4CAF50] focus:ring-opacity-40 focus:outline-none"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Produit</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Catégorie</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Prix</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                                            <span className="font-medium text-gray-700">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{product.category}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{product.stock}</td>
                                    <td className="py-3 px-4 text-sm font-semibold text-gray-800">{product.price.toFixed(2)} MAD</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[product.status]}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-3">
                                            <button onClick={() => handleEditProduct(product)} className="text-blue-500 hover:text-blue-700">
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
            </div>
            {isModalOpen && (
                <ProductModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={handleSaveProduct}
                    product={editingProduct} 
                />
            )}
        </>
    );
};

export default Products;
