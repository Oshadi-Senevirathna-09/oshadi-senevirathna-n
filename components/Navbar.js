import { useState, useEffect,useContext} from "react";
import { Link } from "react-scroll";
import { FaMoon, FaSun } from "react-icons/fa";
import React from "react";
import ThemeContext from "../pages/context/ThemeContext";

export default function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  


  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Oshadi Senevirathna</h1>
        
       
<ul className="hidden md:flex space-x-10 text-gray-1000 dark:text-gray-1000 text-lg font-medium">
  {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
    <li key={item}>
      <Link
        to={item.toLowerCase()}
        smooth={true}
        duration={500}
        className="cursor-pointer hover:text-blue-500 transition"
      >
        {item}
      </Link>
    </li>
  ))}
  {/* Resume Button - Opens Google Drive CV in a New Tab */}
  <li>
    <a
      href="https://drive.google.com/file/d/1ic4JEOhvfp4uqwnqBZwQRVJetCDxVVGK/view?usp=sharing" // Replace YOUR_CV_ID with actual ID
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer hover:text-blue-500 transition"
    >
      Resume
    </a>
  </li>
</ul>


        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="text-gray-700 dark:text-gray-300 text-2xl focus:outline-none"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  
    
  );
}
