import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../Button.jsx";
import Input from "../../Input.jsx";
import Label from "../../Label.jsx";
import TextArea from "../../TextArea.jsx";
import { useLocation } from "react-router-dom";
export default function ExtracurricularForm() {
  const location = useLocation();
  const { activity, operation } = location.state;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm(
    operation == "edit"
      ? {
          defaultValues: {
            title: activity.title || "",
            role: activity.role || "",
            year: activity.year || "",
            description: activity.description || "",
          },
        }
      : {}
  );

  const onSubmitForm = (data) => {
    if (operation == "edit") {
      console.log("Editing form: ", data);
    } else {
      console.log("Added", data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Extracurricular Activity Details
      </h2>

      <div>
        <Label htmlFor="title">Activity Title</Label>
        <Input
          type="text"
          id="title"
          {...register("title", { required: "Activity title is required" })}
          className={`${errors.title ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Input
          type="text"
          id="role"
          {...register("role", { required: "Role is required" })}
          className={`${errors.title ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.role && (
          <p className="mt-1 text-sm text-re d-500">{errors.role.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="year">Year Range</Label>
        <Input
          type="text"
          id="year"
          {...register("year", {
            required: "Year range is required",
            pattern: {
              value: /^\d{4}-\d{4}$/,
              message: "Year range should be in format YYYY-YYYY",
            },
          })}
          placeholder="e.g., 2020-2022"
          className={`mt-1 block w-full ${
            errors.year ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.year && (
          <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
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
            maxLength: {
              value: 200,
              message: "Description must be 200 characters or less",
            },
          })}
          rows="3"
          className={`mt-1 block w-full ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        ></TextArea>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {watch("description").length}/200 characters
        </p>
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <Button type="submit" className="w-full ">
          Save Activity
        </Button>
      </div>
    </form>
  );
}
