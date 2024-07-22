'use client';
import React from 'react';
import Offers from '@/app/components/layouts/Offers';
import Nav from '@/app/components/layouts/Nav';
import {useParams, useSearchParams, useRouter} from 'next/navigation';

const CategoryPage: React.FC = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const category = params.category ? params.category.toString() : null;
    const gender = searchParams.get('gender');

    const handleSetCategory = (newCategory: string, newGender: string) => {
        router.push(`/category/${newCategory}?gender=${newGender}`);
    };
    return (
        <div>
            <Nav setCategory={handleSetCategory}/>
            <Offers selectedCategory={category} selectedGender={gender}/>
        </div>
    );
};

export default CategoryPage;
