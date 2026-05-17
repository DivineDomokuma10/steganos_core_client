import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type THttpMethod = "GET" | "POST";

export type TResponseType = "json" | "blob";

export type TCopyStatus = "idle" | "copied" | "error";

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type TApiResponse<T> = TApiSuccess<T> | TApiError;

export type TLucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type TApiSuccess<T> = {
  data: T;
  message: string;
  status: "success";
};

export type TApiError = {
  message: string;
  status: "error";
};
