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
    <section className="h-screen bg-neutral-200 dark:bg-neutral-700">
      <div className="container mx-auto flex h-full p-10">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg font-medium text-gray-600">Username</label>
              <input
                type="text"
                name="username"
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

        <div className="hidden lg:block lg:w-6/12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-r-lg p-6">
          <div className="flex justify-center items-center h-full text-white">
            <div>
              <h4 className="mb-6 text-xl font-semibold">
                Contact Us
              </h4>
              <p className="text-sm">
              we are dedicated to providing exceptional service and support. Whether you have a question, feedback, or need assistance, we want to hear from you. Our "Contact Us" form makes it easy for you to reach out to us directly. Simply fill out the form with your topic, details, and contact information, and our team will get back to you as soon as possible. We value your input and are committed to ensuring that your experience with us is as seamless and pleasant as possible. Please don't hesitate to get in touch with us if you need anything. We're here to help!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
