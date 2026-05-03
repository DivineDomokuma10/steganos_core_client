import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type THttpMethod = "GET" | "POST";

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

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

export type TApiResponse<T> = TApiSuccess<T> | TApiError;
