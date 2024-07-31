'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";

interface FormDataState {
    name: string;
    description: string;
    imageName?: string;
    imageFile: File | null;
    price: string;
    clothingCategory: string;
    url: string;
    gender: string;
    size: string;
}

interface OfferFormProps {
    formData: FormDataState;
    setFormData: (data: FormDataState) => void;
    handleSubmit: (e: FormEvent) => void;
    action: 'edit' | 'add';
}

const OfferForm: React.FC<OfferFormProps> = ({ formData, setFormData, handleSubmit, action }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData({ ...formData, imageFile: file });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Clothing Category</label>
                <select
                    name="clothingCategory"
                    value={formData.clothingCategory}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                >
                    <option value="" disabled>Select a category</option>
                    <option value="SHIRTS">Shirts</option>
                    <option value="PANTS">Pants</option>
                    <option value="JACKETS">Jackets</option>
                    <option value="SHOES">Shoes</option>
                    <option value="ACCESSORIES">Accessories</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">URL</label>
                <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Gender</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                >
                    <option value="" disabled>Select a gender</option>
                    <option value="MAN">Man</option>
                    <option value="WOMAN">Woman</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Size</label>
                <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                />
                {formData.imageName && <p className="mt-2 text-sm text-gray-500">Selected file: {formData.imageName}</p>}
            </div>
            <div className="flex justify-between mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    {action === 'edit' ? 'Update Offer' : 'Add Offer'}
                </button>
                <Link href="/admin/dashboard">
                    <button type="button" className="bg-yellow-400 text-black px-4 py-2 rounded-lg">Back to dashboard</button>
                </Link>
            </div>
        </form>
    );
};

export default OfferForm;
