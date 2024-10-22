import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/forgefolio.svg";
const Logo = () => {
  return (
    <Link to="/" className="flex max-w-fit absolute items-center">
      <img
        src={icon}
        alt="Logo"
        className="h-8 mr-2 text-black dark:text-white"
      />
      <span className="ml-2 text-xl font-bold text-black dark:text-white">
        FolioForge
      </span>
    </Link>
  );
};

export default Logo;
