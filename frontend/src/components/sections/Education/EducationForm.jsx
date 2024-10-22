import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Button from "../../Button";
const degreeOptions = [
  "High School Diploma",
  "GCSE",
  "10th Grade",
  "12th Grade",
  "B.Sc. (Bachelor of Science)",
  "B.A. (Bachelor of Arts)",
  "B.Com. (Bachelor of Commerce)",
  "B.Tech. (Bachelor of Technology)",
  "B.E. (Bachelor of Engineering)",
  "M.Sc. (Master of Science)",
  "M.A. (Master of Arts)",
  "M.Com. (Master of Commerce)",
  "M.Tech. (Master of Technology)",
  "MBA (Master of Business Administration)",
  "Ph.D. (Doctor of Philosophy)",
  "M.D. (Doctor of Medicine)",
  "Diploma",
  "Certificate Course",
];

export default function EducationForm() {
  const location = useLocation();
  const { education, operation } = location.state || {};
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(
    operation == "edit"
      ? {
          defaultValues: {
            collegeName: education.collegeName || "",
            degree: education.degree || "",
            place: education.place || "",
            duration: education.duration || "",
            percentage: education.percentage || "",
          },
        }
      : {}
  );

  const onSubmitForm = (data) => {
    console.log("Submit form: ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {education && education.collegeName
          ? "Edit Education"
          : "Add Education"}
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="collegeName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            College Name
          </label>
          <input
            type="text"
            id="collegeName"
            {...register("collegeName", {
              required: "College name is required",
            })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
              ${errors.collegeName ? "border-red-500" : "border-gray-300"}
              dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          />
          {errors.collegeName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.collegeName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="degree"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Degree
          </label>
          <Controller
            name="degree"
            control={control}
            rules={{ required: "Degree is required" }}
            render={({ field }) => (
              <div className="relative mt-1">
                <input
                  {...field}
                  list="degree-options"
                  className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                    ${errors.degree ? "border-red-500" : "border-gray-300"}
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                />
                <datalist id="degree-options">
                  {degreeOptions.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
              </div>
            )}
          />
          {errors.degree && (
            <p className="mt-1 text-sm text-red-500">{errors.degree.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="place"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Place
          </label>
          <input
            type="text"
            id="place"
            {...register("place", { required: "Place is required" })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
              ${errors.place ? "border-red-500" : "border-gray-300"}
              dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          />
          {errors.place && (
            <p className="mt-1 text-sm text-red-500">{errors.place.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Duration
          </label>
          <input
            type="text"
            id="duration"
            {...register("duration", {
              required: "Duration is required",
              pattern: {
                value: /^\d{4}-\d{4}$/,
                message: "Duration must be in the format YYYY-YYYY",
              },
            })}
            placeholder="YYYY-YYYY"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
              ${errors.duration ? "border-red-500" : "border-gray-300"}
              dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-500">
              {errors.duration.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="percentage"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Percentage (optional)
          </label>
          <input
            type="number"
            id="percentage"
            step="0.1"
            {...register("percentage", {
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message:
                  "Please enter a valid percentage (up to 2 decimal places)",
              },
            })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
              ${errors.percentage ? "border-red-500" : "border-gray-300"}
              dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          />
          {errors.percentage && (
            <p className="mt-1 text-sm text-red-500">
              {errors.percentage.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <Button type="submit" className="w-full">
          {education && education.collegeName
            ? "Save Changes"
            : "Add Education"}
        </Button>
      </div>
    </form>
  );
}
