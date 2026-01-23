import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplets, Menu, X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clear auth
    setIsOpen(false);  // close mobile menu
    navigate('/login'); // redirect to login page
  };

  return (
    <nav className="navbar-bg backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="w-full px-0">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 logo-bg rounded-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              Aqua Safe
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>

            {!user ? (
                <div className="flex items-center space-x-4">
                <Link to="/login" className="nav-link">Sign In</Link>
                <Link to="/register" className="btn-accent">Register</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' ? (
                  <Link to="/admin" className="btn-primary">
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                )}

                <Link to="/report" className="btn-accent">
                  Report Issue
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t py-4 space-y-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="mobile-link">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="mobile-link">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="mobile-link">Contact</Link>

            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="mobile-link">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="btn-accent block text-center">
                  Register
                </Link>
              </>
            ) : (
              <>
                  {user.role === 'admin' ? (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="btn-primary block text-center">
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="mobile-link">
                    Dashboard
                  </Link>
                )}

                <Link to="/report" onClick={() => setIsOpen(false)} className="btn-accent block text-center">
                  Report Issue
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left w-full text-gray-700 hover:text-red-600 px-3 py-2 text-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
