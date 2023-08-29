import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Import
import NavBar from './components/studentComponents/NavBar';
import Login from './components/studentComponents/Login';
import Signup from './components/studentComponents/Signup';
import OtpInputPage from './components/studentComponents/OtpInputPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verifyotp/:phone" element={<OtpInputPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
