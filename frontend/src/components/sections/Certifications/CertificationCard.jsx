import Button from "../../Button";
import EditButton from "../../EditButton";
import DeleteButton from "../../DeleteButton";
import CertificateButton from "../../CertificateButton";
import { useNavigate } from "react-router-dom";
export default function ({ certificate }) {
  const navigate = useNavigate();
  const onEdit = (certificate) => {
    navigate(`/profile/certifications/form`, {
      state: {
        certification: { ...certificate },
        operation: "edit",
      },
    });
  };
  const onDelete = (certificate) => {
    console.log(`Delete Document`, certificate);
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-gray-700 relative">
      <div className="p-4">
        <div className="flex items-center mb-4">
          {certificate.logo && (
            <img
              src={certificate.logo}
              alt={`${certificate.organization} logo`}
              className="w-12 h-12 object-contain mr-4"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {certificate.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {certificate.organization}
            </p>
          </div>
        </div>
        {certificate.rank && (
          <p className="text-sm mb-2 text-gray-700 dark:text-gray-200">
            Rank: {certificate.rank}
          </p>
        )}
        <p className="text-sm text-gray-700 dark:text-gray-200">
          Year: {certificate.year}
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 p-4">
        <CertificateButton className="w-full " repoLink={certificate.preview}>
          View Certificate
        </CertificateButton>
      </div>
      <div className="absolute top-2 right-2 space-y-2">
        <EditButton
          onClick={() => {
            onEdit(certificate);
          }}
        />
        <DeleteButton />
      </div>
    </div>
  );
}
