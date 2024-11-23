import React from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

interface OfferCardProps {
    id: string;
    name: string;
    description: string;
    imageName: string;
    price: number;
}

const OfferCard: React.FC<OfferCardProps> = ({id, name, imageName, price}) => {
    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/image/${imageName}`;
    const router = useRouter();

    const handleClick = () => {
        router.push(`/offer/${id}`);
    };

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <div className={`p-4 border rounded w-full`}>
                <div className="w-full h-64 relative">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw,
                               (max-width: 1200px) 50vw,
                               33vw"
                        priority
                    />
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-bold">{name}</h2>
                    <p className="text-gray-900 font-bold">{price.toFixed(2)}zł</p>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
