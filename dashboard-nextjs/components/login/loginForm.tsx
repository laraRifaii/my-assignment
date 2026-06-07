"use client";

import { useState } from "react";
import Error from "@/components/states/Error";
type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
};
type ApiError = {
  message?: string;
};
export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await onSubmit(email, password);
    } catch (err: unknown) {
      const e = err as ApiError;

      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto flex flex-col gap-4"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-lg p-3"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-lg p-3"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white rounded-lg p-3 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
     {error && <Error message={error} />}
    </form>
  );
}
