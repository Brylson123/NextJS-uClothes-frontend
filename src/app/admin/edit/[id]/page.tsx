'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import OfferForm from '@/app/components/common/OfferForm';
import OfferPreview from '@/app/components/common/OfferPreview';

interface FormDataState {
    name: string;
    description: string;
    imageName?: string;
    imageFile: File | null;
    price: string;
    clothingCategory: string;
    gender: string;
    size: string;
    active: boolean;
}

export default function EditOfferPage() {
    const { id } = useParams();
    const [formData, setFormData] = useState<FormDataState>({
        name: '',
        description: '',
        imageName: '',
        imageFile: null,
        price: '',
        clothingCategory: '',
        gender: '',
        size: '',
        active: false,
    });
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setFormData({
                    name: data.offer.name,
                    description: data.offer.description,
                    imageName: data.offer.imageName,
                    imageFile: null,
                    price: data.offer.price,
                    clothingCategory: data.offer.clothingCategory,
                    gender: data.offer.gender,
                    size: data.offer.size,
                    active: data.offer.active,
                });
            } catch (err) {
                setError('Failed to fetch offer details.');
            }
        })();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        if (formData.imageFile) data.append('image', formData.imageFile);
        data.append('price', formData.price);
        data.append('clothingCategory', formData.clothingCategory);
        data.append('gender', formData.gender);
        data.append('size', formData.size);
        data.append('active', formData.active.toString());

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/update/${id}`, {
                method: 'PUT',
                body: data as any,
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.success) {
                setSuccess(true);
            } else {
                setError('Failed to update the offer.');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while updating the offer.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <h2 className="text-2xl font-bold mb-6">Edit Offer</h2>
                    {success && <p className="text-green-500 mb-4">Offer updated successfully!</p>}
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <OfferForm
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <div className="lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-6">Offer Preview</h2>
                    <OfferPreview formData={formData} />
                </div>
            </div>
        </div>
    );
}
