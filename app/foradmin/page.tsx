"use client";

import { useEffect, useState } from "react";

type ContactRequest = {
  id: string;
  topic: string;
  details: string;
  contact: string;
  status: string;
};

export default function AdminContactRequests() {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ContactRequest | null>(null);

  useEffect(() => {
    // Fetch contact requests from the API
    const fetchRequests = async () => {
      const response = await fetch("/api/contactus");
      if (response.ok) {
        const data = await response.json();
        setContactRequests(data);
      }
    };
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const response = await fetch(`/api/contactus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
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
    const response = await fetch(`/api/contactus/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setContactRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    }
  };

  const handleEdit = (request: ContactRequest) => {
    setEditData(request);
    setIsEditing(true); // Open the modal
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editData) return;
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditSubmit = async () => {
    if (!editData) return;
    const response = await fetch(`/api/contactus/${editData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });

    if (response.ok) {
      setContactRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === editData.id ? { ...request, ...editData } : request
        )
      );
      setIsEditing(false); // Close the modal
    }
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
                <button
                  onClick={() => handleEdit(request)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing */}
      {isEditing && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Contact Request</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Topic</label>
              <input
                type="text"
                name="topic"
                value={editData.topic}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Details</label>
              <textarea
                name="details"
                value={editData.details}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact</label>
              <input
                type="text"
                name="contact"
                value={editData.contact}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleEditSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
