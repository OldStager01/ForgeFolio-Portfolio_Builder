import React from "react";

const LinkButton = ({ children, repoLink }) => {
  return (
    <a
      href={repoLink}
      target="_blank"
      style={{
        fontFamily: "'Roboto', sans-serif",
        textDecoration: "none",
      }}
      className="inline-flex items-center justify-between min-w-[117px] py-2 px-2 min-h-[40px] bg-transparent border-slate-800 hover:bg-slate-700 hover:text-white text-[14px] rounded-md dark:border-white border-[1px] dark:hover:bg-white dark:hover:text-black group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-transparent dark:stroke-white group-hover:stroke-white dark:group-hover:stroke-slate-700 lucide lucide-square-arrow-out-up-right"
      >
        <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
        <path d="m21 3-9 9" />
        <path d="M15 3h6v6" />
      </svg>
      {children}
    </a>
  );
};

export default LinkButton;
