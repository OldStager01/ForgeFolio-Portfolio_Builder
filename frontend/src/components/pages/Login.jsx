import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import LogoBig from "../LogoBig.jsx";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import Label from "../Label.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice.js";
import Constants from "../../Constants.js";
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const password = watch("password");

  useEffect(() => {
    if (password) {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (password.match(/[A-Z]/)) strength += 25;
      if (password.match(/[a-z]/)) strength += 25;
      if (password.match(/[0-9!@#$%^&*()]/)) strength += 25;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
    console.log(passwordStrength);
  }, [password]);

  const onSubmit = async (data) => {
    console.log("submitting the form...");
    axios
      .post(
        `${Constants.url}/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Response from server", response.data);
        dispatch(login(response.data._id));

        fetch(`${Constants.url}/user/details`, {
          method: "GET",
          credentials: "include",
        })
          .then((res) => {
            console.log("Data Fetched", response.data);
            return response.data;
          })
          .catch((e) => {
            console.log("Error", e);
          });

        // navigate("/profile/personal");
      })
      .catch((e) => {
        alert("Failed to login");
        console.log(e);
      });
    console.log("Login attempted", data);
  };
  return (
    <>
      {/* <Logo /> */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-200 dark:bg-gray-900 bg-gray-100">
        {/* Background Graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(0,0,0,0.1) dark:rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-md w-1/2 space-y-8">
          <LogoBig />
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    {...register("password", { required: true, minLength: 5 })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleSubmit(onSubmit)}
                >
                  Login
                </Button>
              </div>
            </div>
          </form>

          <div className="text-center">
            <a
              href="/signup"
              className="font-medium text-black  dark:text-white "
            >
              Visiting for the first time?{" "}
              <span className="text-slate-600"> Create Account</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
