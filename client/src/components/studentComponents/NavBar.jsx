/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-red-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">Logo</div>
                <ul className="flex space-x-4">
                    <li>
                        <a className="text-white">Home</a>
                    </li>
                    <li>
                        <a className="text-white">About</a>
                    </li>
                    <li>
                        <a className="text-white">Services</a>
                    </li>
                    <li>
                        <a className="text-white">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
