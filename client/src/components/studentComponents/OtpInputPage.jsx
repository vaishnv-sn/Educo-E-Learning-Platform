import React, { useState, useEffect } from 'react';
import instance from '../../constants/axios';
import { useNavigate, useParams } from 'react-router-dom';

const OtpInputPage = () => {
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState(45);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const { phone } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    useEffect(() => {
        let interval;

        // Start countdown when the component mounts
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else {
            // Show the "Re-send OTP" button after countdown
            setIsButtonVisible(true);
        }

        // Clean up interval when the component unmounts
        return () => clearInterval(interval);
    }, [countdown]);

    const handleSubmit = (event) => {
        event.preventDefault();
        instance
            .post('/otpverification', { otp, phone })
            .then(({ data }) => {
                alert(data.message);
                localStorage.setItem('user', JSON.stringify(data.newUser));
                localStorage.setItem('token', JSON.stringify(data.token));
                navigate('/');
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleResendOtp = () => {
        instance
            .post('/otpresend', { phone })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });

        setCountdown(45);
        setIsButtonVisible(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-xl font-semibold mb-4">Enter OTP</h1>
                <p>
                    OTP has been sent to <span className="text-blue-600">+91{phone}</span>
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            className="w-120 h-12 px-3 py-2 border border-gray-300 rounded text-center"
                            maxLength={4}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Submit
                    </button>
                </form>
                <div className="mt-4">
                    {isButtonVisible ? (
                        <button
                            onClick={handleResendOtp}
                            className="text-blue-500 hover:underline focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Re-send OTP
                        </button>
                    ) : (
                        <p>
                            You can request a resend after <span className="text-red-500">{countdown}</span> seconds.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpInputPage;
