"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import MDEditor, {
  commands,
  ICommand,
  EditorContext,
} from "@uiw/react-md-editor";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

import { useUploadThing } from "@/lib/clientUtils";

export default function MDX({ source, components }: any) {
  const router = useRouter();
  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        const url = res[0].url;
        setValue(
          (value) =>
            value +
            `
<video className="mx-auto" controls width="85%">
  <source src="${url}" type="video/mp4" />
</video>
          `
        );
      },
    }
  );
  const [value, setValue] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      // urlencoded
      const base64 = btoa(value);
      const urlencode = encodeURIComponent(base64);
      router.push(`?source=${urlencode}`);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value, router]);
  function dropHandler(ev: any) {
    ev.preventDefault();
    const files: File[] = [];
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();

          files.push(file);
        }
      });
    } else {
      [...ev.dataTransfer.files].forEach((file, i) => {
        files.push(file);
      });
    }

    startUpload(files);
  }
  return (
    <div className="w-1/3 border shrink-0 h-full text-black">
      <MDEditor
        onDrop={dropHandler}
        value={value}
        preview="edit"
        commands={[commands.bold, commands.codeBlock]}
        extraCommands={[commands.fullscreen]}
        onChange={(val) => {
          setValue(val!);
        }}
      />
      <div className="text-white">{isUploading && <div>Uploading...</div>}</div>
    </div>
  );
}
