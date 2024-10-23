import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import EducationCard from "./EducationCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
// Mock data for demonstration purposes
// const initialEducation = [
//   {
//     id: 1,
//     collegeName: "KBH",
//     degree: "10th",
//     place: "Nashik",
//     duration: "2018-2019",
//     percentage: "9.4",
//   },
//   {
//     id: 2,
//     collegeName: "XYZ University",
//     degree: "Bachelor of Science",
//     place: "Mumbai",
//     duration: "2019-2023",
//     percentage: "8.7",
//   },
// ];

export default function EducationSection() {
  const navigate = useNavigate();
  // const [educationEntries, setEducationEntries] = useState(initialEducation);
  const educationEntries = useSelector((state) => state.user.data.education);
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Education
        </h2>
        <Button onClick={() => navigate("/profile/education/form")}>
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Education
        </Button>
      </div>
      <div className="space-y-4">
        {educationEntries &&
          educationEntries.map((entry, index) => (
            <EducationCard key={index} entry={entry} />
          ))}
      </div>
    </div>
  );
}
