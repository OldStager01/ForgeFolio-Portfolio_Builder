import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/forgefolio.svg";
const LogoBig = () => {
  return (
    <Link to="/" className="flex flex-col items-center text-center mt-5 ml-5">
      <img src={icon} alt="Logo" className="h-28 mr-2" />
      <span className="m-5 text-5xl font-bold ">FolioForge</span>
    </Link>
  );
};

export default LogoBig;
