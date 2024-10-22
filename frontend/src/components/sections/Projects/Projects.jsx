import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import Button from "../../Button.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProjectsSection() {
  const navigate = useNavigate();
  const projects = useSelector((state) => state.user.data.projects);

  return (
    <section className="py-5 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center mb-8">
          <Button
            onClick={() => {
              navigate("/profile/projects/form");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Project
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects &&
            projects.map((project, index) => (
              <ProjectCard key={project._id || index} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
}
