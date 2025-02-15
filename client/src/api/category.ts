import axios, { AxiosError } from "axios";

const categoryApi = axios.create({
  baseURL: "/api/v1/categories",
});

export interface CategoryProps {
  name: string;
  description?: string;
}

async function getAllCategories() {
  try {
    const response = await categoryApi.get(`/`);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
}

async function getCategoryById(categoryId: string) {
  try {
    const response = await categoryApi.get(`/get-category/${categoryId}`);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
}

async function getDishByCategory({ categoryId }: { categoryId: string }) {
  try {
    const response = await categoryApi.get(`/get-dish-by-category/${categoryId}`);
    return response.data?.data;
  } catch (error) {
    console.log(`Error fetching dishes by category:`);
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
}

async function createCategory(formData: any) {
  try {
    const response = await categoryApi.post(`/add-category`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
}

async function updateCategory({
  categoryId,
  ...categoryAttribute
}: {
  categoryId: string;
}) {
  try {
    const response = await categoryApi.patch(
      `/update-category/${categoryId}`,
      { ...categoryAttribute },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data?.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
}

async function deleteCategory(categoryId: string) {
  try {
    await categoryApi.delete(`/delete-category/${categoryId}`);
  } catch (error) {
    console.log(`Error deleting category:`);
    console.error(error)
    
    if (error instanceof AxiosError){
        throw new Error(error.response?.data?.message)
    }
  }
}

export {
  getAllCategories,
  getCategoryById,
  getDishByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
