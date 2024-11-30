'use client'
import React from "react";
import Link from "next/link";

const CancelPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
            <div className="max-w-md text-center">
                <h1 className="text-4xl font-bold text-red-600">Payment was canceled</h1>
                <p className="mt-4 text-lg text-gray-700">
                    It seems you canceled the payment. If this was a mistake, please try again.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Return to the home page
                </Link>
            </div>
        </div>
    );
};

export default CancelPage;
