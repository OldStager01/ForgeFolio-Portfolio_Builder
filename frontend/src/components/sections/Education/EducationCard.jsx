import React from "react";
import { PencilIcon } from "lucide-react";
import EditButton from "../../EditButton";
import DeleteButton from "../../DeleteButton";
import { useNavigate } from "react-router-dom";
function EducationCard({ entry, ...props }) {
  const navigate = useNavigate();
  const onEdit = (entry) => {
    navigate(`/profile/education/form`, {
      state: {
        education: { ...entry },
        operation: "edit",
      },
    });
  };

  const onDelete = (entry) => {
    console.log("Delete Document: ", entry);
  };

  return (
    <div
      className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
      {...props}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {entry.collegeName}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{entry.degree}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 dark:text-gray-300">{entry.place}</p>
          <p className="text-gray-600 dark:text-gray-300">{entry.duration}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Percentage: {entry.percentage}
      </p>
      <div className="flex space-x-2 absolute bottom-2 right-2 p-2">
        <EditButton
          onClick={() => onEdit(entry)}
          className="bottom-2 right-2 p-2 bg-white hover:bg-gray-50"
          aria-label="Edit education entry"
        >
          <PencilIcon className="w-5 h-5" />
        </EditButton>
        <DeleteButton onClick={() => onDelete(entry)} />
      </div>
    </div>
  );
}

export default EducationCard;
