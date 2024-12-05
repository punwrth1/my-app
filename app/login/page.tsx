"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

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
      loginSchema.parse(formData);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        // Redirect to contact us form after successful login
        router.push("/contactus");
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid input");
    }
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The Lotus Team
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">Please login to your account</p>

                      {/* Username input */}
                      <div className="mb-4">
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Username"
                          className="w-full p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                      </div>

                      {/* Password input */}
                      <div className="mb-4">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                          className="w-full p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl transition duration-300"
                      >
                        Log In
                      </button>

                      <div className="mt-8 text-center">
                        <p className="text-gray-700 text-lg">
                          Don't have an account?{" "}
                          <Link
                            href="/register"
                            className="text-blue-500 underline hover:text-blue-600 transition duration-300 text-lg"
                          >
                            Create an account
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div className="hidden lg:block lg:w-6/12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-r-lg p-6">
                  <div className="flex justify-center items-center h-full text-white">
                    <div>
                      <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                      </h4>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
