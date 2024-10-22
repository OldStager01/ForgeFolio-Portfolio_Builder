import React from "react";
import { FileBadge } from "lucide-react";
const CertificateButton = ({ children, repoLink }) => {
  return (
    <a
      href={repoLink}
      target="_blank"
      style={{
        fontFamily: "'Roboto', sans-serif",
        textDecoration: "none",
      }}
      className="inline-flex  space-x-2 items-center cursor-pointer py-2 px-2  bg-transparent border-slate-800 hover:bg-slate-700 hover:text-white text-[14px] rounded-md dark:border-white border-[1px] dark:hover:bg-white dark:hover:text-black group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className=" fill-transparent dark:stroke-white group-hover:stroke-white dark:group-hover:stroke-slate-700 lucide lucide-file-badge"
      >
        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M7 16.5 8 22l-3-1-3 1 1-5.5" />
      </svg>
      <div className="text-md">{children}</div>
    </a>
  );
};

export default CertificateButton;
