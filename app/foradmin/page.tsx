"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ContactUs = {
  id: string;
  topic: string;
  details: string;
  contact: string;
  status: string;
};

export default function ForAdmin() {
  const [contactRequests, setContactRequests] = useState<ContactUs[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch all contact requests from the API
    const fetchRequests = async () => {
      const response = await fetch("/api/contactus");
      if (response.ok) {
        const data = await response.json();
        setContactRequests(data);
      } else {
        alert("Failed to fetch contact requests.");
      }
    };
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const response = await fetch(`/api/contactus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    if (response.ok) {
      setContactRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    // Send DELETE request with the id as a query parameter
    const response = await fetch(`/api/contactus?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setContactRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } else {
      alert("Failed to delete the contact request.");
    }
  };

  const handleLogout = () => {
    // Clear the user's session (if you are using localStorage or cookies, remove the token here)
    localStorage.removeItem("authToken"); // or delete cookie
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Admin - Contact Us Requests</h1>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Topic</th>
            <th className="px-4 py-2 text-left">Details</th>
            <th className="px-4 py-2 text-left">Contact</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactRequests.map((request) => (
            <tr key={request.id}>
              <td className="border px-4 py-2">{request.topic}</td>
              <td className="border px-4 py-2">{request.details}</td>
              <td className="border px-4 py-2">{request.contact}</td>
              <td className="border px-4 py-2">{request.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleStatusChange(request.id, "Approved")}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(request.id, "Rejected")}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDelete(request.id)}
                  className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Logout Button Below Table */}
      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
