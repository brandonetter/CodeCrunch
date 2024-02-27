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
// uuid

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

import { components } from "@/components/MDX";
import { useUploadThing } from "@/lib/clientUtils";
const Button = () => {
  const [editorContent, setEditorContent] = useState("");
  const { preview, dispatch } = useContext(EditorContext);
  const click = () => {
    dispatch!({
      preview: preview === "edit" ? "preview" : "edit",
    });
  };
  if (preview === "edit") {
    return (
      <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
        <polygon
          fill="currentColor"
          points="0 71.293 0 122 319 122 319 397 0 397 0 449.707 372 449.413 372 71.293"
        />
        <polygon
          fill="currentColor"
          points="429 71.293 520 71.293 520 122 481 123 481 396 520 396 520 449.707 429 449.413"
        />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
      <polygon
        fill="currentColor"
        points="0 71.293 0 122 38.023 123 38.023 398 0 397 0 449.707 91.023 450.413 91.023 72.293"
      />
      <polygon
        fill="currentColor"
        points="148.023 72.293 520 71.293 520 122 200.023 124 200.023 397 520 396 520 449.707 148.023 450.413"
      />
    </svg>
  );
};

export default function MDX({ source, components }: any) {
  const hide: ICommand = {
    name: "preview",
    keyCommand: "preview",
    value: "preview",
    icon: <Button />,
  };
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
        extraCommands={[commands.fullscreen, hide]}
        onChange={(val) => {
          setValue(val!);
        }}
      />
      <div className="text-white">{isUploading && <div>Uploading...</div>}</div>
    </div>
  );
}
