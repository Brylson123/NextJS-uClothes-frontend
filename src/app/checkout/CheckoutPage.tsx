'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const CheckoutPage: React.FC = () => {
    const searchParams = useSearchParams();

    const [offer, setOffer] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        parcelLocker: '',
    });

    const productId = searchParams?.get('productId');

    useEffect(() => {
        if (!productId) return;

        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${productId}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch product details: ${res.status}`);
                }
                const data = await res.json();
                setOffer(data.offer);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [productId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    productName: offer?.name,
                    amount: offer?.price,
                    customerFirstName: formData.firstName,
                    customerLastName: formData.lastName,
                    customerEmail: formData.email,
                    customerPhoneNumber: formData.phone,
                    addressStreet: formData.address,
                    addressCity: formData.city,
                    addressZipCode: formData.zipCode,
                    addressParcelLockerNumber: formData.parcelLocker.toUpperCase(),
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                console.error('Error:', error);
                return;
            }

            const { checkoutUrl } = await res.json();
            window.location.href = checkoutUrl;
        } catch (error) {
            console.error('Failed to create checkout session', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="md:w-1/4 w-full flex flex-col items-center text-center">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                {offer && (
                    <div>
                        <Image
                            src={`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${offer.imageName}`}
                            alt={offer.name}
                            width={300}
                            height={300}
                            className="object-contain w-full h-auto"
                        />
                        <h3 className="text-lg font-semibold mt-4">{offer.name}</h3>
                        <p className="text-lg">{offer.price.toFixed(2)} PLN</p>
                    </div>
                )}
            </div>

            <div className="md:w-3/4 w-full flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="p-4 border rounded text-lg"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="p-4 border rounded text-lg"
                            required
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 border rounded text-lg"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-4 border rounded text-lg"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-4 border rounded text-lg"
                        required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="p-4 border rounded text-lg"
                            required
                        />
                        <input
                            type="text"
                            name="zipCode"
                            placeholder="ZIP Code"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="p-4 border rounded text-lg"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="parcelLocker"
                        placeholder="Parcel Locker"
                        value={formData.parcelLocker.toUpperCase()}
                        onChange={handleChange}
                        className="w-full p-4 border rounded text-lg"
                        required
                    />
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700"
                        >
                            Proceed to Payment
                        </button>
                        <Link
                            href={`/offer/${productId}`}
                            className="px-6 py-3 bg-green-600 text-white text-lg rounded hover:bg-green-700"
                        >
                            Back to offer
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
