"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContactUsPage() {
  const router = useRouter();

  // Handle logout logic
  const handleLogout = () => {
    // Clear any authentication tokens, e.g., from localStorage or cookies
    localStorage.removeItem("token"); // or whatever key you use for token storage
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-black mb-6">Contact Us</h1>
      <p className="text-center text-lg mb-12 text-gray-700">
        Please choose an option below.
      </p>

      <div className="flex flex-col space-y-4">
        {/* Button to access Contact Form */}
        <Link href="/contactus/form" passHref>
          <button
            className="bg-blue-500 text-white py-3 px-8 rounded-lg text-xl hover:bg-blue-600 transition duration-300"
          >
            Contact Form
          </button>
        </Link>

        {/* Button to view submitted requests */}
        <Link href="/contactus/list" passHref>
          <button
            className="bg-green-500 text-white py-3 px-8 rounded-lg text-xl hover:bg-green-600 transition duration-300"
          >
            View Submitted Requests
          </button>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-3 px-8 rounded-lg text-xl hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
