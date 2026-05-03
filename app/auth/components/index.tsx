import { TLucideIcon } from "@/types";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

interface IErrorMessagesProps {
  errorMessages: string[];
}

interface IAuthInputProps<T extends FieldValues> {
  type: string;
  label: string;
  name: Path<T>;
  icon?: TLucideIcon;
  placeholder: string;
  register: UseFormRegister<T>;
}

export function AuthInput<T extends FieldValues>({
  type,
  name,
  icon,
  label,
  register,
  placeholder,
}: IAuthInputProps<T>) {
  const InputIcon = icon;

  return (
    <label
      htmlFor={name}
      className="flex flex-col w-full text-base text-gray-200 gap-2"
    >
      {label}

      <div className="w-full relative">
        <input
          id={name}
          {...{ type, placeholder, ...register(name) }}
          className="bg-gray-800 p-5 w-full placeholder:text-lg placeholder:text-gray-400 focus:outline-primary"
        />

        {InputIcon && (
          <span className="absolute right-5 top-1/4">
            <InputIcon size={27} className="text-primary" />
          </span>
        )}
      </div>
    </label>
  );
}

export const ErrorMessages = ({ errorMessages }: IErrorMessagesProps) => {
  return (
    <section className="w-full p-5 border bg-red-600/10 border-red-600 flex flex-col space-y-2">
      {errorMessages.map((errMsg, i) => (
        <div key={errMsg + i} className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />

          <p className="text-red-500 text-sm">{errMsg.toUpperCase()}</p>
        </div>
      ))}
    </section>
  );
};
