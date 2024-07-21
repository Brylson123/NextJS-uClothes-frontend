'use client';
import Nav from "@/app/components/layouts/Nav";
import Offers from '@/app/components/layouts/Offers';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleSetCategory = (category: string) => {
        router.push(`/category/${category}`);
    };

    return (
        <div>
            <Nav setCategory={handleSetCategory} />
            <Offers selectedCategory={null} />
        </div>
    );
}
