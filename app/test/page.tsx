"use client";
import React, { useState } from "react";
import { uploadImage } from "../api/actions";

const TestPage = () => {
  const [file, setFile] = useState("");
  const handleSubmit = async (formData: FormData) => {
    console.log(formData.get("file"));
    const result = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    console.log(result);
  };
  return (
    <div>
      <h1>Upload Image</h1>
      <form action={uploadImage}>
        <input
          type="file"
          multiple
          name="file"
          onChange={(e: any) => setFile(e.target.file)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TestPage;
