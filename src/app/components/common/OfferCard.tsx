'use client'
import React from 'react';
import Image from "next/image";

interface OfferCardProps {
    id: string;
    name: string;
    description: string;
    imageName: string;
    price: number;
}

const OfferCard: React.FC<OfferCardProps> = ({ name, description, imageName, price}) => {
    const imageUrl = `http://localhost:8080/image/${imageName}`;

    return (
        <div className="p-4 border rounded">
            <Image
                src={imageUrl}
                alt={name}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
            />
            <div className="mt-4">
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-gray-500">{description}</p>
                <p className="text-gray-900 font-bold">{price.toFixed(2)}zł</p>
            </div>
        </div>
    );
};

export default OfferCard;
