"use client";

import { convertFileToUrl } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback } from "react";
import Dropzone from "react-dropzone";
import { FileWithPath } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "../ui/button";

type fileUploaderProps = {
  setFile: Dispatch<SetStateAction<File[]>>;
  imgUrl: string;
  onFieldChange: (url: string) => void;
};

export default function FileUploader({
  setFile,
  onFieldChange,
  imgUrl,
}: fileUploaderProps) {
  
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });
  return (
    <main
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
      {...getRootProps()}
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {imgUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imgUrl}
            className="w-full object-cover object-center"
            alt="avatar"
            width={77}
            height={77}
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img
            src={"/assets/icons/upload.svg"}
            alt="avatar"
            width={77}
            height={77}
          />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </main>
  );
}
