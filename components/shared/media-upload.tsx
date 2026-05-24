"use client";
import { ImagePlus, Terminal, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";

import { cn } from "@/utils";
import { MAX_SIZE } from "@/utils/constant";
import Image from "next/image";

type FileUploadProps<T extends FieldValues> = {
  label?: string;
  name: FieldPath<T>;
  disabled?: boolean;
  className?: string;
  control: Control<T>;
};

export function FileUpload<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  className,
}: FileUploadProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      field.onChange(file);
    },
    [field],
  );

  const removeImage = () => {
    field.onChange(null);
    setPreview(null);
  };

  const isFile = (value: unknown): value is File => {
    return value instanceof File;
  };

  useEffect(() => {
    if (!isFile(field.value)) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(field.value);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [field.value]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      disabled,
      multiple: false,
      maxSize: MAX_SIZE,
      accept: {
        "image/png": [".png"],
      },
    });

  const rejectionError = fileRejections[0]?.errors[0]?.message;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <label className="text-base text-gray-200">{label}</label>}

      <div
        {...getRootProps()}
        className={cn(
          `group relative flex min-h-70 w-full cursor-pointer
          items-center justify-center overflow-hidden
          bg-gray-800 p-5 transition-all
          border border-transparent
          hover:border-primary`,
          className,
          {
            "border-primary ring-2 ring-primary/30": isDragActive,
            "cursor-not-allowed opacity-50": disabled,
          },
        )}
      >
        <input {...getInputProps()} />

        {preview ? (
          <>
            <Image
              fill
              src={preview}
              alt="Preview"
              className="h-full max-h-[320px] w-full object-cover"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="
              invisible
                absolute right-4 top-4
                flex h-10 w-10 items-center justify-center
                bg-black/70 text-white
                transition hover:bg-red-500 group-hover:visible
              "
            >
              <X size={20} />
            </button>

            <div
              className="
                absolute bottom-0 left-0 w-full
                bg-black/60 p-4 backdrop-blur-sm  
                invisible group-hover:visible
              "
            >
              <p className="truncate text-base text-gray-200">
                {field.value?.name}
              </p>

              <p className="text-xs text-gray-400">
                PNG • {(field.value?.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span
              className="
                flex h-16 w-16 items-center justify-center
                rounded-full bg-primary/10
              "
            >
              <ImagePlus size={32} className="text-primary" />
            </span>

            <div className="space-y-1">
              <p className="text-lg font-medium text-gray-200">
                {isDragActive ? "Drop PNG image here" : "UPLOAD CARRIER IMAGE"}
              </p>

              <p className="text-sm text-gray-400">
                Drag & drop or click to browse
              </p>

              <p className="text-sm text-gray-400">PNG only • Max size 10MB</p>
            </div>
          </div>
        )}
      </div>

      {(error?.message || rejectionError) && (
        <div className="flex items-center space-x-2">
          <Terminal size={18} className="stroke-3 text-red-500" />

          <p className="text-red-500">
            {(error?.message as string).toUpperCase()}
            {rejectionError.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
}
