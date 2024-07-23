import React from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

interface OfferCardProps {
    id: string;
    name: string;
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
            <div className={`p-4 border rounded  w-full`}>
                <Image
                    src={imageUrl}
                    alt={name}
                    width={400}
                    height={400}
                    className="object-cover  h-64 w-full"
                />
                <div className="mt-4">
                    <h2 className="text-lg font-bold">{name}</h2>
                    <p className="text-gray-900 font-bold">{price.toFixed(2)}zł</p>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
