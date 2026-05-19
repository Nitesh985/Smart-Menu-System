import axios, { AxiosError } from "axios";

export const userApi = axios.create({
  baseURL: "/api/v1/users",
});

interface RegisterParams {
  username: string;
  email: string;
  contactNo: string;
  address?: string;
  tableId?: string | null; // Pass the active table reference context
}

const registerUser = async ({ tableId, ...data }: RegisterParams) => {
  try {
    const response = await userApi.post(
      `/sign-up`, 
      { ...data },
      {
        headers: {
          // Provide custom tracking headers to satisfy express gateway middleware checks
          "x-table-id": tableId ? tableId : "",
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Axios user signup communication error:", error);
    if (error instanceof AxiosError) {
        throw error;
    }
    return null;
  }
};

export { registerUser };