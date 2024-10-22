import React, { useState } from "react";
import Button from "../../Button";
import CompetitionCard from "./CompetitionCard.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const demoCompetitions = [
  {
    id: 1,
    name: "Global Hackathon 2023",
    date: "June 15-17, 2023",
    organization: "TechGlobal",
    achievement: "1st Place",
    summary: "Developed an AI-powered solution for sustainable urban planning.",
    githubLink: "https://github.com/username/global-hackathon-2023",
    certificateLink: "https://example.com/certificate/global-hackathon-2023",
  },
  {
    id: 2,
    name: "Data Science Challenge",
    date: "April 5-7, 2023",
    organization: "DataCorp",
    achievement: "Runner-up",
    summary:
      "Created a machine learning model to predict renewable energy production.",
    githubLink: "https://github.com/username/data-science-challenge",
  },
  {
    id: 3,
    name: "Startup Pitch Competition",
    date: "February 20, 2023",
    organization: "InnovateNow",
    achievement: "Best Tech Innovation Award",
    summary: "Pitched a revolutionary IoT solution for smart agriculture.",
    certificateLink: "https://example.com/certificate/startup-pitch-2023",
  },
];

export default function CompetitionsSection() {
  const navigate = useNavigate();
  const competitions = useSelector((state) => state.user.data.competitions);
  return (
    <section className="py-5 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center mb-8">
          <Button onClick={() => navigate("/profile/competitions/form")}>
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
            Add Competition
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {competitions &&
            competitions.map((competition, index) => (
              <CompetitionCard
                key={competition.id || index}
                competition={competition}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
