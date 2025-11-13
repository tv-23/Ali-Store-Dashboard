import React, { useState } from 'react';

const Settings = () => {
    const [accountSettings, setAccountSettings] = useState({
        name: 'Admin User',
        email: 'admin@alimarket.com',
        currentPassword: '',
        newPassword: '',
    });

    const [storeSettings, setStoreSettings] = useState({
        storeName: 'ALI Market',
        contactEmail: 'support@alimarket.com',
        contactPhone: '0522-010101',
        logo: 'https://placehold.co/150x50/4CAF50/FFFFFF/png?text=ALI+Market'
    });
    
    const [paymentSettings, setPaymentSettings] = useState({
        publicKey: 'pk_test_************************',
        secretKey: 'sk_test_************************',
        currency: 'MAD'
    });

    const [logoPreview, setLogoPreview] = useState<string | null>(storeSettings.logo);

    const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountSettings({ ...accountSettings, [e.target.name]: e.target.value });
    };

    const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStoreSettings({ ...storeSettings, [e.target.name]: e.target.value });
    };
    
    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPaymentSettings({ ...paymentSettings, [e.target.name]: e.target.value });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                setStoreSettings({ ...storeSettings, logo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const InputField = ({ label, name, type, value, onChange }: { label: string, name: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                autoComplete="off"
            />
        </div>
    );

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Paramètres</h3>
                <button
                    className="px-6 py-3 text-white bg-[#4CAF50] hover:bg-green-600 rounded-lg shadow-md font-bold transition-transform transform hover:scale-105"
                >
                    Enregistrer les modifications
                </button>
            </div>

            <div className="space-y-8">
                {/* Account Settings */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Paramètres du Compte</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Nom Complet" name="name" type="text" value={accountSettings.name} onChange={handleAccountChange} />
                        <InputField label="Adresse Email" name="email" type="email" value={accountSettings.email} onChange={handleAccountChange} />
                        <InputField label="Mot de passe actuel" name="currentPassword" type="password" value={accountSettings.currentPassword} onChange={handleAccountChange} />
                        <InputField label="Nouveau mot de passe" name="newPassword" type="password" value={accountSettings.newPassword} onChange={handleAccountChange} />
                    </div>
                </div>

                {/* Store Settings */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Paramètres de la Boutique</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Nom de la Boutique" name="storeName" type="text" value={storeSettings.storeName} onChange={handleStoreChange} />
                        <InputField label="Email de Contact" name="contactEmail" type="email" value={storeSettings.contactEmail} onChange={handleStoreChange} />
                        <InputField label="Téléphone de Contact" name="contactPhone" type="tel" value={storeSettings.contactPhone} onChange={handleStoreChange} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Logo de la Boutique</label>
                            <div className="flex items-center space-x-4">
                                {logoPreview && <img src={logoPreview} alt="Aperçu du logo" className="h-12 bg-gray-100 rounded p-1" />}
                                <input type="file" onChange={handleLogoChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Settings */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Paramètres de Paiement</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Clé Publique Stripe" name="publicKey" type="text" value={paymentSettings.publicKey} onChange={handlePaymentChange} />
                        <InputField label="Clé Secrète Stripe" name="secretKey" type="password" value={paymentSettings.secretKey} onChange={handlePaymentChange} />
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
                            <select
                                name="currency"
                                id="currency"
                                value={paymentSettings.currency}
                                onChange={handlePaymentChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white"
                            >
                                <option value="MAD">MAD - Dirham Marocain</option>
                                <option value="USD">USD - Dollar Américain</option>
                                <option value="EUR">EUR - Euro</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
