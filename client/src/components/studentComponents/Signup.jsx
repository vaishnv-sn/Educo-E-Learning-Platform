import React, { useEffect, useState } from 'react';
import instance from '../../constants/axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    const handleSignup = async () => {
        try {
            const validationErrors = {};

            if (!firstname.trim()) {
                validationErrors.firstname = 'First name is required';
            }
            if (!lastname.trim()) {
                validationErrors.lastname = 'Last name is required';
            }
            if (!phone.trim()) {
                validationErrors.phone = 'Phone number is required';
            }
            if (!email.trim()) {
                validationErrors.email = 'Email is required';
            }
            if (!password.trim()) {
                validationErrors.password = 'Password is required';
            }
            if (!rePassword.trim()) {
                validationErrors.rePassword = 'Please confirm your password';
            }
            if (password !== rePassword) {
                validationErrors.password = "Passwords don't match";
                validationErrors.rePassword = "Passwords don't match";
            }

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            instance
                .post('/uniqueNumberCheck', { phone })
                .then(async () => {
                    await instance.post('/signup', { firstname, lastname, phone, email, password });
                    navigate(`/verifyotp/${phone}`);
                })
                .catch(({ response }) => {
                    toast.error(response.data.error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white w-4/5 h-fit p-8 rounded-lg shadow-md">
                    <h2 className="flex justify-center text-2xl font-semibold mb-4">Sign Up</h2>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="mr-7">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300"
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="Enter your firstname"
                            />
                            {errors.firstname && <span className="text-red-500">{errors.firstname}</span>}
                        </div>
                        <div className="mr-7">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300"
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Enter your lastname"
                            />
                            {errors.lastname && <span className="text-red-500">{errors.lastname}</span>}
                        </div>
                        <div className="mr-7">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300"
                                type="tel"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your 10 digit mobile number"
                            />
                            {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                        </div>
                        <div className="mr-7">
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
                                placeholder="Enter your email id"
                            />
                            {errors.email && <span className="text-red-500">{errors.email}</span>}
                        </div>
                        <div className="mr-7">
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
                                placeholder="Choose a strong password"
                            />
                            {errors.password && <span className="text-red-500">{errors.password}</span>}
                        </div>
                        <div className="mr-7">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rePassword">
                                Re-enter Password
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300"
                                type="password"
                                id="rePassword"
                                name="rePassword"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                placeholder="Re-enter your strong password"
                            />
                            {errors.rePassword && <span className="text-red-500">{errors.rePassword}</span>}
                        </div>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="text-green-700">
                                Login here
                            </Link>
                        </p>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            className="bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 w-1/2"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
