import React, { useEffect, useState } from "react";
import { Button, FileInput, Image, Input, Loading, Select, TextArea } from "../..";
import { getAllCategories } from "../../../api/category";

export type FormDataType = {
  name: string;
  price: number | null;
  category: string | null;
  description: string;
  image?: File | null;
};

interface DishFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  formData: FormDataType;
}

function DishForm({ handleSubmit, formData, setFormData}:DishFormProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [categories, setCategories] = useState([]);


  const handleChange = (e: (React.FormEvent<HTMLFormElement>)) => {
    const { name, value, files, type } = e.currentTarget;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "file" && files ? files[0] : value,
      };
    });
  };

  useEffect(() => {
    if (formData.image && !formData.image?.url) {
      const imageUrl = URL.createObjectURL(formData.image);
      setImageUrl(imageUrl);
    }
  }, [formData.image]);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        const trimmedData = data.map((category:any) => category.name);
        setCategories(trimmedData);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  return (
    <>
      <form
        className="mt-5 flex flex-col justify-center items-center space-y-4 "
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="Enter Food Name"
          inputStyles="w-full input-info"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Enter Food Price"
          inputStyles="w-full input-info"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <TextArea
          placeholder="Enter Food Description "
          className=" textarea-info w-full mt-4"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Select
          options={categories}
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          Select Category
        </Select>
        {(imageUrl || formData?.image?.url) && <Image imageUrl={formData?.image?.url || imageUrl} className="p-3 w-[400px] " />}
        <FileInput onChange={handleChange} name="image" />
        <Button
          type="submit"
          className="green-submit-button text-xl font-semibold w-full border-none hover:border"
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default DishForm;
