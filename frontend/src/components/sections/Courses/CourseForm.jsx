import React from "react";
import { useForm, Controller } from "react-hook-form";
import { PlusIcon } from "lucide-react";
import Button from "../../Button.jsx";
import Input from "../../Input.jsx";
import Label from "../../Label.jsx";
import TextArea from "../../TextArea.jsx";
import { useLocation } from "react-router-dom";
const commonTechnologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring",
  "C#",
  ".NET",
  "PHP",
  "Laravel",
  "Ruby",
  "Ruby on Rails",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
];

export default function CoursesForm() {
  const location = useLocation();
  const { course, operation } = location.state;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm(
    operation == "edit"
      ? {
          defaultValues: {
            name: course.name || "",
            description: course.description || "",
            technologies: course.technologies || [],
            tutor: course.tutor || "",
            platform: course.platform || "",
            year: course.year || "",
          },
        }
      : {}
  );

  const watchTechnologies = watch("technologies");

  const handleTechnologyAdd = (tech) => {
    if (tech && !watchTechnologies.includes(tech)) {
      setValue("technologies", [...watchTechnologies, tech]);
    }
  };

  const handleTechnologyRemove = (tech) => {
    setValue(
      "technologies",
      watchTechnologies.filter((t) => t !== tech)
    );
  };

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Course Details
      </h2>

      <div>
        <Label htmlFor="name">Course Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Course name is required" })}
          className={`${errors.name ? "border-red-500" : "border-gray-300"}
           }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 100,
              message: "Description must be 100 characters or less",
            },
          })}
          rows="2"
          className={`${errors.name ? "border-red-500" : "border-gray-300"}
           }`}
        ></TextArea>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {watch("description").length}/100 characters
        </p>
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="technologies">Technologies</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {watchTechnologies.map((tech, index) => (
            <span
              key={index}
              className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-slate-900 dark:text-slate-300"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleTechnologyRemove(tech)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <Input
            type="text"
            id="technologies"
            list="tech-suggestions"
            className={`flex-grow rounded-l-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm
              ${errors.technologies ? "border-red-500" : "border-gray-300"}
              dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleTechnologyAdd(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <datalist id="tech-suggestions">
            {commonTechnologies.map((tech, index) => (
              <option key={index} value={tech} />
            ))}
          </datalist>
          <Button
            type="button"
            onClick={() => {
              const input = document.getElementById("technologies");
              handleTechnologyAdd(input.value);
              input.value = "";
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
        {errors.technologies && (
          <p className="mt-1 text-sm text-red-500">
            {errors.technologies.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="tutor">Tutor/Instructor</Label>
        <Input
          type="text"
          id="tutor"
          {...register("tutor", { required: "Tutor name is required" })}
          className={`mt-1 block w-full ${
            errors.name ? "border-red-500" : "border-gray-300"
          }
           }`}
        />
        {errors.tutor && (
          <p className="mt-1 text-sm text-red-500">{errors.tutor.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="platform">Platform</Label>
        <Input
          type="text"
          id="platform"
          {...register("platform", { required: "Platform is required" })}
          className={`${errors.name ? "border-red-500" : "border-gray-300"}
           }`}
        />
        {errors.platform && (
          <p className="mt-1 text-sm text-red-500">{errors.platform.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          type="number"
          id="year"
          {...register("year", {
            required: "Year is required",
            min: { value: 1900, message: "Year must be 1900 or later" },
            max: {
              value: new Date().getFullYear(),
              message: "Year cannot be in the future",
            },
          })}
          className={`${errors.name ? "border-red-500" : "border-gray-300"}
           }`}
        />
        {errors.year && (
          <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          className={`w-full ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        >
          Save Course
        </Button>
      </div>
    </form>
  );
}
