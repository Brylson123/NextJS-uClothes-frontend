'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Nav: React.FC<{ setCategory: (category: string) => void }> = ({ setCategory }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current | 0);
            timeoutRef.current = null;
        }
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 200);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current | 0);
            }
        };
    }, []);

    const handleCategorySelect = (category: string) => {
        setCategory(category);
        router.push(`/category/${category}`);
    };

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-start">
                        <div
                            className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                MAN
                            </button>
                            {isDropdownOpen && (
                                <div
                                    className="absolute left-0 mt-2 w-48 bg-white shadow-lg z-10"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <a
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleCategorySelect('shirts')}
                                    >
                                        SHIRTS
                                    </a>
                                    <a
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleCategorySelect('pants')}
                                    >
                                        PANTS
                                    </a>
                                    <a
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleCategorySelect('jackets')}
                                    >
                                        JACKETS
                                    </a>
                                    <a
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleCategorySelect('shoes')}
                                    >
                                        SHOES
                                    </a>
                                    <a
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleCategorySelect('accessories')}
                                    >
                                        ACCESSORIES
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <a href={'/'}><div className="text-lg font-bold text-gray-700">uClothes</div></a>
                    </div>
                    <div className="flex-1"></div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
