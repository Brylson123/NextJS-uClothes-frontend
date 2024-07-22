'use client';
import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

const Nav: React.FC<{ setCategory: (category: string, gender: string) => void }> = ({setCategory}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<{ [key: string]: boolean }>({MAN: false, WOMAN: false});
    const timeoutRef = useRef<{ [key: string]: NodeJS.Timeout | null }>({MAN: null, WOMAN: null});
    const router = useRouter();

    const handleMouseEnter = (menu: string) => {
        if (timeoutRef.current[menu]) {
            clearTimeout(timeoutRef.current[menu] || 0);
            timeoutRef.current[menu] = null;
        }
        setIsDropdownOpen(prev => ({...prev, [menu]: true}));
    };

    const handleMouseLeave = (menu: string) => {
        timeoutRef.current[menu] = setTimeout(() => {
            setIsDropdownOpen(prev => ({...prev, [menu]: false}));
        }, 80);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current | 0);
            }
        };
    }, []);

    const handleCategoryAndGenderSelect = (category: string, menu: string) => {
        setCategory(category, menu.toLowerCase());
        router.push(`/category/${category}?gender=${menu.toLowerCase()}`);
    };

    const renderDropdown = (menu: string, categories: string[]) => (
        <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(menu)}
            onMouseLeave={() => handleMouseLeave(menu)}
        >
            <button className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                {menu}
            </button>
            {isDropdownOpen[menu] && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg z-10">
                    {categories.map(category => (
                        <a
                            key={category}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleCategoryAndGenderSelect(category.toLowerCase(), menu.toLowerCase())}
                        >
                            {category}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-start">
                        {renderDropdown('MAN', ['All', 'Shirts', 'Pants', 'Jackets', 'Shoes', 'Accessories'])}
                        <div className="ml-4">
                            {renderDropdown('WOMAN', ['All', 'Shirts', 'Pants', 'Jackets', 'Shoes', 'Accessories'])}
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <Link href="/" className="text-lg font-bold text-gray-700">
                            uClothes
                        </Link>
                    </div>
                    <div className="flex-1"></div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
