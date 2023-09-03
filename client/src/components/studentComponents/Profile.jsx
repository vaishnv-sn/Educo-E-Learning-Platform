import React from 'react';

function Profile() {
    let student = localStorage.getItem('user');
    student = JSON.parse(student);
    return (
        <div className="container mx-auto px-4 py-8 w-1/2 flex justify-start">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4"> Profile Info:</h2>
                <div className="flex justify-evenly">
                    <div className="mb-4">
                        <img
                            width={100}
                            src="https://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600093/29213195-male-silhouette-avatar-profile-picture.jpg"
                            alt="avatar"
                        />
                    </div>
                    <div className="mx-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">
                                    <strong>Name:</strong>
                                </p>
                                <p className="font-semibold">{student.firstname + ' ' + student.lastname}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    <strong>Email:</strong>
                                </p>
                                <p className="font-semibold">{student.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    <strong>Phone:</strong>
                                </p>
                                <p className="font-semibold">{student.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    <strong>Courses Enrolled: </strong>
                                </p>
                                <p className="font-semibold">8</p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    <strong>Completed Courses:</strong>
                                </p>
                                <p className="font-semibold">4</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
