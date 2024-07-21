'use client';
import React from 'react';
import Offers from '@/app/components/layouts/Offers';
import Nav from '@/app/components/layouts/Nav';
import { useParams, useRouter } from 'next/navigation';

const CategoryPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    let category: string | null = null;

    if (params.category) {
        category = Array.isArray(params.category) ? params.category[0] : params.category;
    }

    const handleSetCategory = (newCategory: string) => {
        router.push(`/category/${newCategory}`);
    };

    return (
        <div>
            <Nav setCategory={handleSetCategory} />
            <Offers selectedCategory={category} />
        </div>
    );
};

export default CategoryPage;
