'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import AdminOfferCard from "@/app/components/common/AdminOfferCard";
import SkeletonLoader from "@/app/components/common/SkeletonLoader";

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
    const [showLogoutPopup, setShowLogoutPopup] = useState<boolean>(false);

    useEffect(() => {
        ( async () => {
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
        })();

    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete offer with ID ${id}`);
            }

            setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== id));
        } catch (err: any) {
            console.error(err.message);
            setError(`Failed to delete the offer.`);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setShowLogoutPopup(true);
                setTimeout(() => {
                    setShowLogoutPopup(false);
                    window.location.href = '/admin/login';
                }, 2000);
            } else {
                setError('Failed to logout.');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while logging out.');
        }
    };
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-8">
                <SkeletonLoader />
            </div>
        );
    }
    return (
        <div>
            <div className="flex justify-between items-center my-4">
                {/* Sekcja dla mobilnych ekranów */}
                <div className="w-1/2 pr-2 lg:hidden">
                    <Link href="/admin/add">
                        <p className="w-full px-4 py-2 bg-blue-500 text-white rounded-md text-center">
                            Add New Offer
                        </p>
                    </Link>
                </div>
                <div className="w-1/2 pl-2 lg:hidden">
                    <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-500 text-white rounded-md text-center">
                        Logout
                    </button>
                </div>
                <div className="hidden lg:flex justify-between items-center w-full">
                    <div className="w-auto">
                        <Link href="/admin/add">
                            <p className="min-w-[120px] px-4 py-2 bg-blue-500 text-white rounded-md text-center">
                                Add New Offer
                            </p>
                        </Link>
                    </div>

                    <div className="w-1/3 hidden lg:flex justify-center">
                        <span className="font-bold text-lg">Admin Dashboard</span>
                    </div>
                    <div className="w-auto">
                        <button onClick={handleLogout} className="min-w-[120px] px-4 py-2 bg-red-500 text-white rounded-md text-center">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {showLogoutPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">You have been logged out.</h2>
                        <p>Redirecting to login page...</p>
                    </div>
                </div>
            )}
            <div className="max-w-7xl mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {offers.map((offer) => (
                        <AdminOfferCard
                            key={offer.id}
                            id={offer.id}
                            name={offer.name}
                            imageName={offer.imageName}
                            price={offer.price}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
