import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
                <div
                    key={index}
                    className="p-4 border rounded-lg w-full animate-pulse h-[500px] flex flex-col justify-between"
                >
                    <div className="bg-gray-300 w-full h-[300px] mb-4 rounded-lg"></div>
                    <div className="flex flex-col space-y-2">
                        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
                        <div className="bg-gray-300 h-6 w-1/4 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
