import { Prettify, TLucideIcon } from "@/types";
import { Eye, EyeOff, Terminal } from "lucide-react";
import { ReactNode, useState } from "react";

import {
  Path,
  FieldValues,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

interface IAuthInputProps<T extends FieldValues> {
  type: string;
  label: string;
  name: Path<T>;
  icon?: TLucideIcon;
  placeholder: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  disabled?: boolean;
  children?: ReactNode;
}

type IAuthTextAreaProps<T extends FieldValues> = Prettify<
  Omit<IAuthInputProps<T>, "type"> & { rows: number }
>;

export function AuthInput<T extends FieldValues>({
  type,
  name,
  icon,
  label,
  errors,
  disabled,
  register,
  placeholder,
  children,
}: IAuthInputProps<T>) {
  const InputIcon = icon;
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <label
      htmlFor={name}
      className="flex flex-col w-full text-base text-gray-200 gap-2"
    >
      {label}

      <div className="w-full relative">
        <input
          id={name}
          disabled={disabled}
          {...{ type: inputType, placeholder, ...register(name) }}
          className="bg-gray-800 p-5 w-full placeholder:text-lg placeholder:text-gray-400 focus:outline-primary"
        />

        {(InputIcon || type === "password") && (
          <span className="absolute right-5 top-1/4 flex items-center gap-3">
            {InputIcon && <InputIcon size={27} className="text-primary" />}

            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={27} className="text-primary" />
                ) : (
                  <Eye size={27} className="text-primary" />
                )}
              </button>
            )}
          </span>
        )}

        {children && children}
      </div>

      {errors?.[name]?.message && (
        <div className="flex items-center space-x-2">
          <Terminal size={18} className="stroke-3 text-red-500" />

          <p className="text-red-500">
            {(errors[name].message as string).toUpperCase()}
          </p>
        </div>
      )}
    </label>
  );
}

export function AuthTextArea<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  rows = 5,
  placeholder,
}: IAuthTextAreaProps<T>) {
  return (
    <label
      htmlFor={name}
      className="flex w-full flex-col gap-2 text-base text-gray-200"
    >
      {label}

      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className="
            w-full resize-none bg-gray-800 p-5
            placeholder:text-lg placeholder:text-gray-400
            focus:outline-primary
          "
      />

      {errors?.[name]?.message && (
        <div className="flex items-center space-x-2">
          <Terminal size={18} className="stroke-3 text-red-500" />

          <p className="text-red-500">
            {(errors[name].message as string).toUpperCase()}
          </p>
        </div>
      )}
    </label>
  );
}
