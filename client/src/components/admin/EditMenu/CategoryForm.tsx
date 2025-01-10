import React, { useEffect, useState } from "react";
import { Button, FileInput, Image, Input, TextArea } from "../..";

export type FormDataType = {
    name: string;
    description: string;
    image:File | {url: string, public_id:string} | null;
}

interface CategoryFormProps {
    handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}


function CategoryForm({ formData, setFormData, handleSubmit }: CategoryFormProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    if (formData.image && !formData.image?.url) {
      const imageUrl = URL.createObjectURL(formData.image);
      setImageUrl(imageUrl);
    }
  }, [formData.image]);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.currentTarget;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "file" && files ? files[0] : value,
      };
    });
  };
  return (
    <form
      className="mt-5 flex flex-col justify-center items-center space-y-5 "
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Enter Category Name"
        inputStyles="w-full input-info"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextArea
        placeholder="Enter Category Description "
        className=" textarea-info w-full"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      {(imageUrl || formData?.image?.url) && <Image imageUrl={formData?.image?.url || imageUrl} className="p-3 w-[400px]" />}
      
      <FileInput onChange={handleChange} name="image" />
      <Button
        type="submit"
        className="green-submit-button text-xl font-semibold w-full border-none hover:border"
      >
        Submit
      </Button>
      
    </form>
  );
}

export default CategoryForm;
