import GithubButton from "../../GithubButton";
import CertificateButton from "../../CertificateButton";
import EditButton from "../../EditButton";
import DeleteButton from "../../DeleteButton";
import { useNavigate } from "react-router-dom";
export default function ({ key, competition }) {
  const navigate = useNavigate();
  const onEdit = (competition) => {
    navigate(`/profile/competitions/form`, {
      state: {
        competition: { ...competition },
        operation: "edit",
      },
    });
  };

  const onDelete = (competition) => {
    console.log("Delete Document: ", competition);
  };
  return (
    <div
      key={key}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-gray-700 relative"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          {competition.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {competition.date}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
          Organizer: {competition.organization}
        </p>
        <p className="text-sm font-bold text-slate-600 dark:text-white mb-2">
          Achievement: {competition.achievement}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {competition.summary}
        </p>
        <div className="flex space-x-2">
          {competition.githubLink && (
            <a
              href={competition.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <GithubButton>GitHub</GithubButton>
            </a>
          )}
          {competition.certificateLink && (
            <a
              href={competition.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <CertificateButton>Certificate</CertificateButton>
            </a>
          )}
        </div>
      </div>
      <div className="absolute top-2 right-2 space-y-2">
        <EditButton
          onClick={() => {
            onEdit(competition);
          }}
        />
        <DeleteButton
          onClick={() => {
            onDelete(competition);
          }}
        />
      </div>
    </div>
  );
}
