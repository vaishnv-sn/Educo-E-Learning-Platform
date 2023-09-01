/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    const user = localStorage.getItem('user');
    useEffect(() => {
        setAuth(user !== null);
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-red-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">Logo</div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to={'/'} className="text-white">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="text-white"></Link>
                    </li>
                    <li>
                        <Link className="text-white">Courses</Link>
                    </li>
                    {!auth ? (
                        <li>
                            <Link to={'/login'} className="text-white">
                                Login
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to={'/profile'} className="text-white">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-white btn py-2 px-4 rounded bg-orange-500">
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
