'use client'
import React from "react";
import Link from "next/link";

const SuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
            <div className="max-w-md text-center">
                <h1 className="text-4xl font-bold text-green-600">Thank you for your purchase!</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Your payment has been successfully processed.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Return to the home page
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
