import { FieldErrors, FieldValues, Path } from "react-hook-form";

export function useFormError<T extends FieldValues>(errors: FieldErrors<T>) {
  const errorMessages: string[] = [];
  const isErrorExist = Object.keys(errors).length > 0;

  for (const error in errors) {
    errorMessages.push(errors[error]?.message as string);
  }

  return { isErrorExist, errorMessages };
}
