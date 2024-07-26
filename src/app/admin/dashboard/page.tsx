'use client';
import React, {useEffect, useState} from 'react';
import OfferCard from "@/app/components/common/OfferCard";


interface Offer {
    id: string;
    name: string;
    description: string;
    imageName: string;
    price: number;
    clothingCategory: string;
    url: string;
}
export default function AdminDashboard() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}`;
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setOffers(data.offers || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);


    return (
        <div>
            <div className="max-w-7xl mx-auto py-8 flex">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {offers.map((offer) => (
                        <OfferCard
                            key={offer.id}
                            id={offer.id}
                            name={offer.name}
                            description={offer.description}
                            imageName={offer.imageName}
                            price={offer.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}


