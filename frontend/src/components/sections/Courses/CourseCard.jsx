import EditButton from "../../EditButton";
import DeleteButton from "../../DeleteButton";
import { useNavigate } from "react-router-dom";

export default function ({ course, ...props }) {
  const navigate = useNavigate();

  const onEdit = (course) => {
    if (course) {
      navigate(`/profile/courses/form`, {
        state: {
          course: { ...course },
          operation: "edit",
        },
      });
    }
  };

  const onDelete = (course) => {
    if (course) {
      console.log("Delete Course: ", course);
    }
  };
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-gray-700 relative"
      {...props}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          {course.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {course.description}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
          Technologies: {course.technologies.join(", ")}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Tutor: {course.tutor}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Platform: {course.platform}
        </p>
        <p className="text-sm font-bold text-slate-600 dark:text-white mb-2">
          Year: {course.year}
        </p>
        <p className="text-sm font-bold text-slate-600 dark:text-white mb-2">
          <a href={course.preview} target="_blank">
            Visit Course
          </a>
        </p>
      </div>
      <div className="absolute top-2 right-2 space-y-2">
        <EditButton onClick={() => onEdit(course)} />
        <DeleteButton onClick={() => onDelete(course)} />
      </div>
    </div>
  );
}
