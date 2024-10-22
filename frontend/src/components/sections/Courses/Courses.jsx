import React, { useState } from "react";
import Button from "../../Button";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// const demoCourses = [
//   {
//     id: 1,
//     name: "Advanced React Patterns",
//     description:
//       "Deep dive into advanced React concepts and design patterns for scalable applications.",
//     technologies: ["React", "Redux", "TypeScript"],
//     tutor: "Dan Abramov",
//     platform: "Frontend Masters",
//     year: 2023,
//   },
//   {
//     id: 2,
//     name: "Machine Learning A-Z",
//     description:
//       "Comprehensive course covering various machine learning algorithms and their implementations.",
//     technologies: ["Python", "Scikit-learn", "TensorFlow"],
//     tutor: "Andrew Ng",
//     platform: "Coursera",
//     year: 2022,
//   },
//   {
//     id: 3,
//     name: "Full Stack Web Development",
//     description:
//       "End-to-end web development course covering both frontend and backend technologies.",
//     technologies: ["JavaScript", "Node.js", "Express", "MongoDB"],
//     tutor: "Colt Steele",
//     platform: "Udemy",
//     year: 2022,
//   },
// ];

export default function CoursesSection({}) {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.user.data.courses);
  return (
    <section className="py-5 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center mb-8">
          <Button onClick={() => navigate("/profile/courses/form")}>
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
            Add Course
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {courses &&
            courses.map((course, index) => (
              <CourseCard key={course.id || index} course={course} />
            ))}
        </div>
      </div>
    </section>
  );
}
