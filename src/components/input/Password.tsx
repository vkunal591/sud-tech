import React, { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordProps {
  field: {
    name: string;
    label: string;
    value?: string;
    required?: boolean;
    placeholder?: string;
    confirmPlaceholder?: string;
  };
  setFormData?: any;
  className?: string;
  handleInputChange?: any;
}

const Password: FC<PasswordProps> = ({
  field,
  className,
  setFormData,
  handleInputChange,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    handleInputChange();
    setFormData((prev: any) => ({ ...prev, password: e.target.value }));
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    setFormData((prev: any) => ({ ...prev, confirmPassword: e.target.value }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
        <div className="relative">
          <label
            htmlFor={field.name}
            className="block font-medium text-gray-700 mb-2"
          >
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </label>
          <input
            name={field.name}
            value={password}
            required={field.required}
            onChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            placeholder={field.placeholder || "Enter your password"}
            className="border border-gray-300 rounded-lg p-2 w-full text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span
            onClick={toggleShowPassword}
            className="absolute bottom-3 right-2 flex items-center cursor-pointer"
          >
            {!showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="relative">
          <label className="block font-medium text-gray-700 mb-2">
            Confirm Password
            {field.required && <span className="text-red-500"> *</span>}
          </label>
          <input
            value={confirmPassword}
            required={field.required}
            name={`${field.name}-confirm`}
            onChange={handleConfirmPasswordChange}
            type={showConfirmPassword ? "text" : "password"}
            placeholder={field.confirmPlaceholder || "Confirm your password"}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span
            onClick={toggleShowConfirmPassword}
            className="absolute bottom-3 right-2 flex items-center cursor-pointer"
          >
            {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
    </div>
  );
};

export default Password;
