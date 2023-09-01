import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../constants/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    const handleLogin = () => {
        console.log(email, password);
        instance
            .post('/login', { email, password })
            .then(({ data }) => {
                localStorage.setItem('user', JSON.stringify(data.student));
                localStorage.setItem('token', JSON.stringify(data.auth));
                navigate('/');
            })
            .catch(({ response }) => {
                alert(response.data.error);
            });
    };

    return (
        <div className="flex flex-col bg-gray-100 min-h-screen">
            <div className="flex-grow flex justify-center items-center">
                <div className="w-1/3 h-1/2">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="flex justify-center text-2xl font-semibold mb-4">Student Login</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Email ID"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            <div className="flex justify-between my-4">
                                <Link className="text-red-600">Forget password?</Link>
                                <p>
                                    Don't have an account?{' '}
                                    <Link to={'/signup'} className="text-green-600">
                                        Signup here!
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between pb-5 items-center">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200">
                                Are you a Tutor? Click here!
                            </button>
                            <button
                                className="bg-red-600 text-white px-10 py-2 rounded hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                        <div className="flex justify-center w-full rounded-xl bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300">
                            <button className="p-3 text-white">Sign-up with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
