"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import Label from "../Label.jsx";
import LogoBig from "../LogoBig.jsx";
import Constants from "../../Constants.js";
import { useNavigate } from "react-router-dom";
export default function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpResendTimer, setOtpResendTimer] = useState(30);
  const [otpAttempts, setOtpAttempts] = useState(0);

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

  useEffect(() => {
    let timer;
    if (otpSent && otpResendTimer > 0) {
      timer = setTimeout(() => setOtpResendTimer(otpResendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, otpResendTimer]);

  const onSubmit = async (data) => {
    if (!otpSent) {
      axios
        .post(`${Constants.url}/auth/get-otp`, {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          console.log("OTP sent", response.data);
          setOtpSent(true);
          setOtpResendTimer(30);
          toast.success("OTP sent to your email!");
        })
        .catch((error) => {
          alert("Failed to send otp");
        });
    } else {
      // Verify OTP logic here
      axios
        .post(`${Constants.url}/auth/verify-otp`, {
          email: data.email,
          password: data.password,
          otp: data.otp,
        })
        .then((response) => {
          toast.success("Signup successful!");
          navigate("/login");
        })
        .catch((e) => {
          setOtpAttempts(otpAttempts + 1);
          if (otpAttempts >= 3) {
            toast.error("Too many failed attempts. Please try again later.");
          } else {
            toast.error("Invalid OTP. Please try again.");
          }
        });
    }
  };

  const resendOtp = () => {
    // Resend OTP logic here
    setOtpResendTimer(30);
    toast.info("OTP resent to your email!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-200 dark:bg-gray-900 bg-gray-100">
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
                className="stroke-black/10 dark:stroke-white/10"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="md:max-w-md md:w-1/2 space-y-8">
        <LogoBig />
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create Your Portfolio Account
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
                  {...register("password", { required: true, minLength: 8 })}
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
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="password-strength">Password Strength</Label>
            <progress value={passwordStrength} max="100" className="w-full" />
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Password strength:{" "}
              {passwordStrength <= 25
                ? "Weak"
                : passwordStrength <= 50
                ? "Medium"
                : passwordStrength <= 75
                ? "Strong"
                : "Very Strong"}
            </p>
          </div>

          {otpSent && (
            <div>
              <Label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                OTP
              </Label>
              <Input
                id="otp"
                type="text"
                required
                placeholder="Enter OTP"
                {...register("otp", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                })}
              />
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={otpSent && otpResendTimer > 0}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock
                  className="h-5 w-5 text-slate-500 group-hover:text-slate-400"
                  aria-hidden="true"
                />
              </span>
              {otpSent ? "Verify OTP" : "Sign up"}
            </Button>
          </div>

          {otpSent && (
            <div className="text-center">
              <button
                type="button"
                onClick={resendOtp}
                disabled={otpResendTimer > 0}
                className=""
              >
                {otpResendTimer > 0
                  ? `Resend OTP in ${otpResendTimer}s`
                  : "Resend OTP"}
              </button>
            </div>
          )}
        </form>

        <div className="text-center">
          <a href="/login" className="font-medium text-black  dark:text-white ">
            Already have an account?{" "}
            <span className="text-slate-600">Log in</span>
          </a>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
