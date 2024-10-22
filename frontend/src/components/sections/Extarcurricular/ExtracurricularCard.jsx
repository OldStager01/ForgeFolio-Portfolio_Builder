import EditButton from "../../EditButton";
import DeleteButton from "../../DeleteButton";
import { useNavigate } from "react-router-dom";
export default function ({ activity, ...props }) {
  const navigate = useNavigate();
  const onEdit = (activity) => {
    if (activity) {
      navigate(`/profile/extracurricular/form`, {
        state: {
          activity: { ...activity },
          operation: "edit",
        },
      });
    }
  };

  const onDelete = (activity) => {
    console.log("Delete Activity: ", activity);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-gray-700 relative"
      {...props}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          {activity.title}
        </h3>
        <p className="text-sm font-bold text-slate-600 dark:text-white mb-2">
          Role: {activity.role}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {activity.year}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          {activity.description}
        </p>
      </div>

      <div className="absolute top-2 right-2 space-y-2">
        <EditButton
          onClick={() => {
            onEdit(activity);
          }}
        />
        <DeleteButton
          onClick={() => {
            onDelete(activity);
          }}
        />
      </div>
    </div>
  );
}
