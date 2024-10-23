import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshData } from "../../../redux/slices/userSlice.js";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";
import sendFormData from "../../../utils/sendFormData.js";
import Constants from "../../../Constants.js";
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
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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
    if (operation == "edit") {
      console.log("Editing form: ", data);
      try {
        sendFormData(
          `${Constants.url}${Constants.endpoints.user.updateEducation}/${education._id}`,
          data,
          "PUT"
        ).then((res) => {
          if (res) {
            console.log("Education Updated: ");
            dispatch(refreshData());
          }
        });
      } catch (error) {}
    } else {
      console.log("Added", data);
      try {
        sendFormData(
          `${Constants.url}${Constants.endpoints.user.addEducation}`,
          data
        ).then((res) => {
          if (res) {
            console.log("Education Added: ");
            dispatch(refreshData());
            navigate("/profile/education");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
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
          <Label htmlFor="collegeName">College Name</Label>
          <Input
            type="text"
            id="collegeName"
            {...register("collegeName", {
              required: "College name is required",
            })}
            className={`${
              errors.collegeName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.collegeName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.collegeName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="degree">Degree</Label>
          <Controller
            name="degree"
            control={control}
            rules={{ required: "Degree is required" }}
            render={({ field }) => (
              <div className="relative mt-1">
                <Input
                  {...field}
                  list="degree-options"
                  className={`${
                    errors.degree ? "border-red-500" : "border-gray-300"
                  }`}
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
          <Label htmlFor="place">Place</Label>
          <Input
            type="text"
            id="place"
            {...register("place", { required: "Place is required" })}
            className={`${errors.place ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.place && (
            <p className="mt-1 text-sm text-red-500">{errors.place.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
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
            className={`${
              errors.duration ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-500">
              {errors.duration.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="percentage">Percentage (optional)</Label>
          <Input
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
            className={`${
              errors.percentage ? "border-red-500" : "border-gray-300"
            }`}
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
