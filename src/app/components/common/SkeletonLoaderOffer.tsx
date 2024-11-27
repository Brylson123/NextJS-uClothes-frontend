import React from 'react';

const SkeletonLoaderOffer = () => {
    return (
        <div className="max-w-7xl mx-auto py-8 pt-16 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <div className="bg-gray-300 w-[600px] h-[600px] rounded-lg animate-pulse"></div>
            </div>
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex flex-col items-center lg:items-start space-y-4">
                <div className="bg-gray-300 h-8 w-3/4 rounded animate-pulse"></div>
                <div className="bg-gray-300 h-6 w-1/2 rounded animate-pulse"></div>
                <div className="bg-gray-300 h-6 w-full rounded animate-pulse"></div>
                <div className="bg-gray-300 h-8 w-1/3 rounded animate-pulse"></div>
                <div className="bg-gray-300 h-6 w-1/4 rounded animate-pulse"></div>
                <div className="bg-gray-300 h-10 w-1/4 rounded animate-pulse"></div>
            </div>
        </div>
    );
};



export default SkeletonLoaderOffer;
