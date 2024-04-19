import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { useState } from 'react';
import Logout from './components/Logout';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './components/Profile';

function App() {

const [loggedInUser, setLoggedInUser] = useState(null);

const handleLogin = async (userData) => {
    setLoggedInUser(userData);
};
const handleLogout = () => {
  setLoggedInUser(null);
};

return (
    <Router>
        <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/home" element={loggedInUser ? <Home {...loggedInUser} onLogout={handleLogout}/> : <Navigate to="/" />} />
            {/* <Route
          path="/profile"
          element={loggedInUser ? <Profile user={loggedInUser} /> : <Login onLogin={handleLogin} />}
        /> */}
         <Route path="/profile" element={loggedInUser ? <Profile user={loggedInUser} /> : <Navigate to="/" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        </Routes>
    </Router>
);
};

export default App;
