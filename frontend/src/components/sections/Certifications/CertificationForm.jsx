import React from "react";
import { useForm } from "react-hook-form";
import { XIcon } from "lucide-react";
import Button from "../../Button.jsx";
import Input from "../../Input.jsx";
import Label from "../../Label.jsx";
import { useLocation } from "react-router-dom";
export default function CertificationsForm() {
  const location = useLocation();
  const { certification, operation } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm(
    operation == "edit"
      ? {
          defaultValues: {
            name: certification.name || "",
            organization: certification.organization || "",
            year: certification.year || "",
            rank: certification.rank || "",
            logo: certification.logo || null,
          },
        }
      : {}
  );

  const watchLogo = watch("logo");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024) {
        // 2MB limit
        setValue("logo", URL.createObjectURL(file));
      } else {
        alert("File size should not exceed 2MB");
      }
    }
  };

  const handleLogoDelete = () => {
    setValue("logo", null);
  };

  const onSubmitForm = (data) => {
    if (operation == "edit") {
      console.log("Submit form: Edit");
    } else {
      console.log("Submit form: Add");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Certification Details
      </h2>

      <div>
        <Label htmlFor="name">Certificate Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Certificate name is required" })}
          errors={errors}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="organization">Organization</Label>
        <Input
          type="text"
          id="organization"
          {...register("organization", {
            required: "Organization is required",
          })}
          className={`${
            errors.organization ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.organization && (
          <p className="mt-1 text-sm  text-red-500">
            {errors.organization.message}
          </p>
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
          className={`${errors.year ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.year && (
          <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="rank">Rank (optional)</Label>
        <Input type="text" id="rank" {...register("rank")} />
      </div>

      <div>
        <label
          htmlFor="logo"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Logo (optional)
        </label>
        <Input
          type="file"
          id="logo"
          onChange={handleLogoUpload}
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 dark:file:bg-gray-700 dark:file:text-gray-200"
        />
      </div>

      {watchLogo && (
        <div className="mt-4 relative">
          <img
            src={watchLogo}
            alt="Certificate logo"
            className="w-32 h-32 object-contain"
          />
          <button
            type="button"
            onClick={handleLogoDelete}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      <div>
        <Button type="submit" className="w-full ">
          Save Certification
        </Button>
      </div>
    </form>
  );
}
