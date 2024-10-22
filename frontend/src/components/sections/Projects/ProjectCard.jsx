import { useState } from "react";
import Button from "../../Button";
import EditButton from "../../EditButton";
import DeleteButton from "../../DeleteButton";
import { useNavigate, useLocation } from "react-router-dom";
export default function ({ project }) {
  const navigate = useNavigate();

  const onEdit = (project) => {
    navigate(`/profile/projects/form`, {
      state: {
        project: { ...project },
        operation: "edit",
      },
    });
  };
  const onDelete = (project) => {
    console.log("Delete Document: ", _id);
  };
  return (
    <div
      key={project._id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-gray-700 relative"
    >
      <img
        src={project.images ? project.images[0] : "#"}
        alt={project.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
          {project.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {project.description}
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 p-4">
        <Button>View Details</Button>
      </div>
      <div className="absolute top-2 right-2 space-y-2">
        <EditButton
          onClick={() => {
            onEdit(project);
          }}
        />
        <DeleteButton
          onClick={() => {
            onDelete(project);
          }}
        />
      </div>
    </div>
  );
}
