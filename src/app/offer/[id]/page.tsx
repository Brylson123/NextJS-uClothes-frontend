'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Nav from '@/app/components/layouts/Nav';
import Image from 'next/image';

interface Offer {
    id: string;
    name: string;
    description: string;
    imageName: string;
    price: number;
    clothingCategory: string;
    url: string;
    gender: string;
    size: string;
}

const OfferDetail: React.FC = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setOffer(data.offer);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8">Error: {error}</h1>
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8">Offer not found</h1>
            </div>
        );
    }

    return (
        <div>
            <Nav setCategory={() => {}} />
            <div className="max-w-7xl mx-auto py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                    <Image
                        src={`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${offer.imageName}`}
                        alt={offer.name}
                        width={600}
                        height={600}
                        className="object-contain w-full h-auto"
                    />
                </div>
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex flex-col items-center lg:items-start">
                    <h2 className="text-3xl font-bold mb-4">{offer.name}</h2>
                    <h2 className="text-xl font-bold mb-4">Size: {offer.size}</h2>
                    <p className="text-xl text-gray-500 mb-4 text-center lg:text-left">{offer.description}</p>
                    <p className="text-2xl font-bold mb-4">{offer.price.toFixed(2)}zł</p>
                    <p className="text-lg mb-4">Category: {offer.clothingCategory}</p>
                    <p className="text-lg mb-4">Gender: {offer.gender}</p>
                    <a
                        href={offer.url}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700"
                    >
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OfferDetail;
