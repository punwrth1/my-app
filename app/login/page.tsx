"use client";  // Add this line to mark the file as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.role === 'ADMIN') {
          router.push("/foradmin"); // Redirect to admin page
        } else {
          router.push("/contactus"); // Redirect to the contact page
        }
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid input");
    }
  };

  return (
    <section className="h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="container mx-auto flex items-center justify-center h-full p-6">
        <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg font-medium text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            >
              Log In
            </button>
          </form>

          {error && (
            <div className="mt-4 text-center text-red-600">
              <p>{error}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-lg text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-500 font-semibold hover:text-blue-700"
              >
                Create one here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
