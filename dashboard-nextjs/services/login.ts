import axios from "axios";
import Cookies from "js-cookie";

export async function login(email: string, password: string) {
  
  try {
    const response = await axios.post("http://localhost:3001/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    Cookies.set("token", token, {
      expires: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      // Validation errors from Zod
      if (data?.errors?.length) {
        throw new Error(
          data.errors.map((err: { message: string }) => err.message).join(", "),
        );
      }

      // Normal backend message
      if (data?.message) {
        throw new Error(data.message);
      }

      throw new Error("Login failed");
    }

    throw error;
  }
}
