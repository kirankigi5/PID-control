
import './App.css';
import Navbar from './navbar';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div> Loading ...</div>

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </div>

    </>

  );
}

export default App;
