import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../Button.jsx";
import Input from "../../Input.jsx";
import Label from "../../Label.jsx";
import TextArea from "../../TextArea.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import sendFormData from "../../../utils/sendFormData.js";
import Constants from "../../../Constants.js";
import { useDispatch } from "react-redux";
export default function CompetitionsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { competition, operation } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm(
    operation == "edit"
      ? {
          defaultValues: {
            name: competition.name || "",
            organization: competition.organization || "",
            achievement: competition.achievement || "",
            date: competition.date || "",
            projectSummary: competition.projectSummary || "",
            certificateLink: competition.certificateLink || "",
          },
        }
      : {}
  );

  const watchCertificate = watch("certificate");

  const handleCertificateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024) {
        // 2MB limit
        setValue("certificate", URL.createObjectURL(file));
      } else {
        alert("File size should not exceed 2MB");
      }
    }
  };

  const handleCertificateDelete = () => {
    setValue("certificate", null);
  };

  const onSubmitForm = (data) => {
    console.log("Submit form: ", data);
    if (operation == "edit") {
      console.log("Editing form: ", data);
      try {
        sendFormData(
          `${Constants.url}${Constants.endpoints.user.updateCompetition}/${competition._id}`,
          data,
          "PUT"
        ).then((res) => {
          if (res) {
            dispatch(refreshData());
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Added", data);
      try {
        sendFormData(
          `${Constants.url}${Constants.endpoints.user.addCompetition}`,
          data
        ).then((res) => {
          if (res) {
            dispatch(refreshData());
            navigate("/profile/competitions");
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Competition Details
      </h2>

      <div>
        <Label htmlFor="name">Competition Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Competition name is required" })}
          className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="organization">Organizing Body</Label>
        <Input
          type="text"
          id="organization"
          {...register("organization", {
            required: "Organizing body is required",
          })}
          className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.organization && (
          <p className="mt-1 text-sm text-red-500">
            {errors.organization.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="achievement">Achievement</Label>
        <Input
          type="text"
          id="achievement"
          {...register("achievement", { required: "Achievement is required" })}
          className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.achievement && (
          <p className="mt-1 text-sm text-red-500">
            {errors.achievement.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          {...register("date", { required: "Date is required" })}
          className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="projectSummary">Project Summary (optional)</Label>
        <TextArea
          id="projectSummary"
          {...register("projectSummary", {
            maxLength: {
              value: 500,
              message: "Project summary must be 500 characters or less",
            },
          })}
          rows="3"
        ></TextArea>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {watch("projectSummary") && watch("projectSummary").length}/500
          characters
        </p>
        {errors.projectSummary && (
          <p className="mt-1 text-sm text-red-500">
            {errors.projectSummary.message}
          </p>
        )}
      </div>

      {/* <div>
          <Label htmlFor="certificateLink">Certificate Link (optional)</Label>
          <Input
            type="url"
            id="certificateLink"
            {...register("certificateLink", {
              validate: (value) =>
                !value || isValidUrl(value) || "Please enter a valid URL",
            })}
            className={`${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.certificateLink && (
            <p className="mt-1 text-sm text-red-500">
              {errors.certificateLink.message}
            </p>
          )}
        </div> */}
      <div>
        <label
          htmlFor="logo"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Certificate
        </label>
        <Input
          type="file"
          id="logo"
          onChange={handleCertificateUpload}
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 dark:file:bg-gray-700 dark:file:text-gray-200"
        />
      </div>

      {watchCertificate && (
        <div className="mt-4 relative">
          <img
            src={watchCertificate}
            alt="Certificate logo"
            className="w-32 h-32 object-contain"
          />
          <button
            type="button"
            onClick={handleCertificateDelete}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      <div>
        <Button type="submit" className="w-full">
          Save Competition
        </Button>
      </div>
    </form>
  );
}
