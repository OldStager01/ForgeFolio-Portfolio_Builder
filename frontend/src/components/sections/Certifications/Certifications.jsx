import React from "react";
import CertificateCard from "./CertificationCard.jsx";
import Button from "../../Button.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function CertificatesSection() {
  const navigate = useNavigate();
  const certifications = useSelector((state) => state.user.data.certifications);

  return (
    <section className="py-5 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center mb-8">
          <Button onClick={() => navigate("/profile/certifications/form")}>
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
            Add Certificate
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {certifications &&
            certifications.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
        </div>
      </div>
    </section>
  );
}
