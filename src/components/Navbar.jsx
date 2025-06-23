import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="group bg-gray-800 p-2 h-11">
      <div className="flex flex-row justify-center items-center gap-[50px]">
        <NavLink to="/" className="text-blue-500 hover:text-white">
          Home
        </NavLink>

        <NavLink to="/pastes" className="text-white hover:text-blue-500">
          Pastes
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
