import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

//Import
import NavBar from './components/studentComponents/NavBar';
import Login from './components/studentComponents/Login';
import Signup from './components/studentComponents/Signup';
import OtpInputPage from './components/studentComponents/OtpInputPage';
import Home from './components/studentComponents/Home';
import Profile from './components/studentComponents/Profile';

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verifyotp/:idAndPhone" element={<OtpInputPage />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="top-center" />
        </>
    );
}

export default App;
