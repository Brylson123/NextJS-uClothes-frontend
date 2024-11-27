'use client';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/validateToken`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    router.push('/admin/dashboard');
                }
            } catch (error) {
                console.error('Error validating token:', error);
            }
        };

        checkToken();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (!username || !password) {
            setMessage('Both username and password are required.');
            setMessageType('error');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
                credentials: 'include',
            });
            const data = await res.json();

            setLoading(false);

            if (!res.ok || !data.success) {
                setMessage('Invalid username or password.');
                setMessageType('error');
            } else {
                setMessage('Successfully logged in!');
                setMessageType('success');
                setTimeout(() => {
                    router.push('/admin/dashboard');
                }, 1000);
            }
        } catch (error: any) {
            setLoading(false);
            setError(error.message || 'An unknown error occurred.');
            setMessageType('error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block mb-1">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                {message && (
                    <div
                        className={`mt-4 p-4 border rounded ${
                            messageType === 'success'
                                ? 'bg-green-100 border-green-400 text-green-700'
                                : 'bg-red-100 border-red-400 text-red-700'
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
