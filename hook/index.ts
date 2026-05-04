import { useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

interface IResMsg {
  msg: string;
  status: "error" | "success";
}

export function useFormError<T extends FieldValues>(errors: FieldErrors<T>) {
  const errorMessages = Object.values(errors)
    .map((err) => err?.message)
    .filter(Boolean) as string[];

  const isErrorExist = errorMessages.length > 0;

  return { isErrorExist, errorMessages };
}

export function useResponseMsg() {
  const [resMsg, setResMsg] = useState<IResMsg | null>(null);

  const setResponseMsg = (msg: IResMsg) => setResMsg(msg);
  const clearResponseMsg = () => setResMsg(null);

  return { resMsg, setResponseMsg, clearResponseMsg };
}
