"use client";

import LoginForm from "@/components/login/loginForm";
import { login } from "@/services/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(
    email: string,
    password: string,
  ) {
    await login(email, password);

    router.push("/");
  }

  return (
    <div className="container mx-auto py-12 ">
      <h1 className="text-2xl font-bold mb-6 max-w-md mx-auto flex flex-col gap-4">
        Login
      </h1>

      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}