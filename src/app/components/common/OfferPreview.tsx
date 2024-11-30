import React from 'react';

interface OfferPreviewProps {
    formData: {
        name: string;
        description: string;
        price: string;
        clothingCategory: string;
        gender: string;
        size: string;
        imageName?: string;
    };
}

const OfferPreview: React.FC<OfferPreviewProps> = ({formData}) => {
    return (
        <div className="border border-gray-300 p-4 rounded-lg">
            <h3 className="text-xl font-bold">{formData.name}</h3>
            <p className="text-sm text-gray-500">Size: {formData.size}</p>
            <div className="mt-2">
                {formData.description.split('\n').map((line, index) => (
                    <p key={index} className="text-gray-700">{line}</p>
                ))}
            </div>
            <p className="mt-4 font-bold text-lg">{formData.price ? `${formData.price} zł` : 'Price'}</p>
            <p className="text-sm text-gray-500">
                Category: {formData.clothingCategory}, Gender: {formData.gender}
            </p>
        </div>
    );
};

export default OfferPreview;
