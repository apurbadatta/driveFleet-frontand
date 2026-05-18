"use client";
import { useState } from "react";
import Link from "next/link";
import { FaCar, FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiChevronDown, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [user, setUser] = useState({ name: "John Doe", photo: null }); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
      
        <Link href="/" className="text-2xl font-bold tracking-wider text-blue-400 flex items-center gap-2">
          <FaCar className="text-blue-500 text-3xl" />
          <span>DriveFleet</span>
        </Link>

      
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/cars" className="hover:text-blue-400 transition">Explore Cars</Link>
          {user && (
            <>
              <Link href="/add-car" className="hover:text-blue-400 transition">Add Car</Link>
              <Link href="/my-bookings" className="hover:text-blue-400 transition">My Bookings</Link>
            </>
          )}
        </div>

     
        <div className="hidden md:block relative">
          {user ? (
            <div>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full transition border border-slate-700"
              >
                {user.photo ? (
                  <img src={user.photo} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <FaUserCircle className="text-xl text-slate-400" />
                )}
                <span className="text-sm font-medium">{user.name}</span>
                <FiChevronDown className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-slate-800 rounded-lg shadow-xl py-2 z-50 border border-slate-100">
                  <Link href="/add-car" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-100 text-sm">Add Car</Link>
                  <Link href="/my-bookings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-100 text-sm">My Bookings</Link>
                  <Link href="/my-cars" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-100 text-sm">My Added Cars</Link>
                  <hr className="my-1 border-slate-100" />
                  <button onClick={() => { setUser(null); setDropdownOpen(false); }} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-medium transition text-sm">
              Login
            </Link>
          )}
        </div>

       
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-2xl text-slate-300 focus:outline-none"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

     
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 pt-2 pb-4 space-y-3 animate-fadeIn">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-400 transition py-1">Home</Link>
          <Link href="/cars" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-400 transition py-1">Explore Cars</Link>
          
          {user ? (
            <div className="pt-2 border-t border-slate-700 space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">User Menu</div>
              <Link href="/add-car" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-400 transition py-1 text-sm">Add Car</Link>
              <Link href="/my-bookings" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-400 transition py-1 text-sm">My Bookings</Link>
              <Link href="/my-cars" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-400 transition py-1 text-sm">My Added Cars</Link>
              <button 
                onClick={() => { setUser(null); setMobileMenuOpen(false); }} 
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 py-1 transition"
              >
                <FiLogOut /> Logout ({user.name})
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block bg-blue-600 hover:bg-blue-700 text-center px-4 py-2 rounded-md font-medium transition text-sm">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}