import React from "react";
import Button from "./Button";
export default function (props) {
  return (
    <Button
      className="bg-white hover:bg-red-600 dark:bg-gray-800 p-2 rounded-full shadow-md transition-opacity group"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className=" h-4 w-4 text-gray-600 group-hover:text-white dark:text-white"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    </Button>
  );
}
