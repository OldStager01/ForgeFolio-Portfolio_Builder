import React from "react";
import { useForm, Controller } from "react-hook-form";
import { PlusIcon, XIcon } from "lucide-react";
import Button from "../../Button.jsx";
import Input from "../../Input.jsx";
import Label from "../../Label.jsx";
import TextArea from "../../TextArea.jsx";
import { useLocation } from "react-router-dom";
const commonTechnologies = [
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
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
  "TypeScript",
];

export default function ProjectsForm() {
  const location = useLocation();
  const { project, operation } = location.state || {};
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
            title: project.name || "",
            description: project.description || "",
            technologies: project.technologies || [],
            repositoryLink: project.githubLink || "",
            liveUrl: project.website || "",
            year: project.year || "",
            images: project.images || [],
          },
        }
      : {}
  );

  const watchTechnologies = watch("technologies");
  const watchImages = watch("images");

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024
    );
    const newImages = validFiles.map((file) => URL.createObjectURL(file));
    setValue("images", [...watchImages, ...newImages]);
  };

  const handleImageDelete = (index) => {
    setValue(
      "images",
      watchImages.filter((_, i) => i !== index)
    );
  };

  const onSubmitForm = (data) => {
    if (operation == "edit") {
      console.log("Edit project", data);
    } else {
      console.log("Add project", data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Project Details
      </h2>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          {...register("title", { required: "Title is required" })}
          errors={errors}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Description
        </label>
        <TextArea
          id="description"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 50,
              message: "Description must be at least 50 characters",
            },
            maxLength: {
              value: 200,
              message: "Description must not exceed 200 characters",
            },
          })}
          rows="3"
          className={`${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        ></TextArea>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {watch("description") && watch("description").length}/200 characters
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
          {watchTechnologies &&
            watchTechnologies.map((tech, index) => (
              <span
                key={index}
                className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-slate-900 dark:text-slate-300"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleTechnologyRemove(tech)}
                  className="ml-1 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
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
            className={`flex-grow rounded-l-md`}
            errors={errors}
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
        <Label htmlFor="repositoryLink">Repository Link</Label>
        <Input
          type="url"
          id="repositoryLink"
          {...register("repositoryLink", {
            validate: (value) =>
              !value ||
              /^https?:\/\/.+/.test(value) ||
              "Please enter a valid URL",
          })}
          errors={errors}
        />
        {errors.repositoryLink && (
          <p className="mt-1 text-sm text-red-500">
            {errors.repositoryLink.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="liveUrl">Live URL (optional)</Label>
        <Input
          type="url"
          id="liveUrl"
          {...register("liveUrl", {
            validate: (value) =>
              !value ||
              /^https?:\/\/.+/.test(value) ||
              "Please enter a valid URL",
          })}
          errors={errors}
        />
        {errors.liveUrl && (
          <p className="mt-1 text-sm text-red-500">{errors.liveUrl.message}</p>
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
          errors={errors}
        />
        {errors.year && (
          <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="images">Images</Label>
        <Input
          type="file"
          id="images"
          errors={errors}
          onChange={handleImageUpload}
          multiple
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 dark:file:bg-gray-700 dark:file:text-gray-200"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {watchImages &&
          watchImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Project image ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
              <Button
                type="button"
                onClick={() => handleImageDelete(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 "
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
      </div>

      <div>
        <Button type="submit" className="w-full">
          Save Project
        </Button>
      </div>
    </form>
  );
}
