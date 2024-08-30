'use client';
import Nav from "@/app/components/layouts/Nav";
import Offers from '@/app/components/layouts/Offers';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleCategoryAndGenderSelect = (category: string, gender: string) => {
        router.push(`/category/${category}/?gender=${gender}`);
    };

    return (
        <div>
            <Nav setCategory={handleCategoryAndGenderSelect} />
            <Offers selectedCategory={null} selectedGender={null}/>
        </div>
    );
}
