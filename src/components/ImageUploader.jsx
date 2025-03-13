import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "masinde_watty"); 

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dyzwwqbcg/image/upload`, 
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url);
      console.log("Image uploaded successfully:", data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag & drop an image here, or click to select one</p>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: "200px" }} />}
    </div>
  );
};

export default ImageUploader;