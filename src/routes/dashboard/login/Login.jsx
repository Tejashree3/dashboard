import React, { useState } from 'react';


const Login = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showRegister, setShowRegister] = useState(true); // State to toggle between Register and Login forms

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <div className={isDarkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-gray-900 min-h-screen'}>
                <div className="container mx-auto py-10 flex justify-center items-center min-h-screen">
                    <div className="w-full flex justify-center items-center">
                    <div className="w-[500px]">
                        {showRegister ? (
                            // Register Form
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-center mb-4">Register</h3>
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="registerName" className="block text-sm font-medium mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            id="registerName"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                            dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="registerEmail" className="block text-sm font-medium mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            id="registerEmail"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                            dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="registerPassword" className="block text-sm font-medium mb-2">Password</label>
                                        <input
                                            type="password"
                                            id="registerPassword"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                            dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="registerConfirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="registerConfirmPassword"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                            dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Confirm your password"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Register
                                    </button>
                                </form>
                                <p className="mt-4 text-center">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setShowRegister(false)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Login
                                    </button>
                                </p>
                            </div>
                        ) : (
                            // Login Form
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-center mb-4">Login</h3>
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="loginEmail" className="block text-sm font-medium mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            id="loginEmail"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                            dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="loginPassword" className="block text-sm font-medium mb-2">Password</label>
                                        <input
                                            type="password"
                                            id="loginPassword"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                            dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Login
                                    </button>
                                </form>
                                <p className="mt-4 text-center">
                                    Don’t have an account?{' '}
                                    <button
                                        onClick={() => setShowRegister(true)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Register
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
