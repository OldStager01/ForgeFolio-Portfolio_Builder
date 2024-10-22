import React, { useState } from "react";
import Button from "../../Button";
import ExtracurricularCard from "./ExtracurricularCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const demoActivities = [
  {
    id: 1,
    title: "Computer Science Club",
    role: "President",
    yearRange: "2021-2023",
    description:
      "Led weekly coding workshops, organized hackathons, and managed a team of 10 executive members.",
  },
  {
    id: 2,
    title: "Debate Society",
    role: "Team Captain",
    yearRange: "2020-2022",
    description:
      "Represented the university in national-level debates, mentored new members, and coordinated practice sessions.",
  },
  {
    id: 3,
    title: "Environmental Awareness Group",
    role: "Event Coordinator",
    yearRange: "2019-2021",
    description:
      "Organized campus-wide sustainability initiatives, including recycling drives and awareness campaigns.",
  },
];

export default function ({}) {
  const navigate = useNavigate();
  const activities = useSelector((state) => state.user.data.extracurricular);
  return (
    <section className="py-5 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center mb-8">
          <Button onClick={() => navigate("/profile/extracurricular/form")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110  2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Activity
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {activities &&
            activities.map((activity) => (
              <ExtracurricularCard key={activity.id} activity={activity} />
            ))}
        </div>
      </div>
    </section>
  );
}
