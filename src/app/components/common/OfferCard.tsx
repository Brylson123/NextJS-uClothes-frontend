import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface OfferCardProps {
    id: string;
    name: string;
    description: string;
    imageName: string;
    price: number;
}

const OfferCard: React.FC<OfferCardProps> = ({ id, name, imageName, price }) => {
    const imageUrl = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${imageName}`;
    const router = useRouter();

    const handleClick = () => {
        router.push(`/offer/${id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer h-[500px] flex flex-col justify-between border rounded-lg p-4"
        >
            {/* Obraz */}
            <div className="w-full h-[300px] relative">
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

            {/* Tekst */}
            <div className="flex flex-col justify-end mt-4">
                <h2 className="text-lg font-bold line-clamp-2 overflow-hidden text-ellipsis">
                    {name}
                </h2>
                <p className="text-gray-900 font-bold mt-2">{price.toFixed(2)}zł</p>
            </div>
        </div>
    );
};

export default OfferCard;
