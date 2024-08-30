import React from 'react';
import styles from './SkeletonLoader.module.css';

const SkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="p-4 border rounded w-full">
                    <div className={`${styles.skeletonImage} w-full h-64 mb-4 rounded-lg`}></div>
                    <div className={`${styles.skeletonText} h-6 w-3/4 mb-2`}></div>
                    <div className={`${styles.skeletonText} h-6 w-1/4`}></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
