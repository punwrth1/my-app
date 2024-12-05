"use client";

import { useEffect, useState } from "react";

type ContactUs = {
  id: string;
  topic: string;
  details: string;
  contact: string;
  status: string;
};

export default function ContactUsList() {
  const [contactRequests, setContactRequests] = useState<ContactUs[]>([]);

  useEffect(() => {
    // Fetch the contact requests made by the logged-in user
    const fetchContactRequests = async () => {
      const response = await fetch("/api/contactus"); // This should be filtered by user ID
      const data = await response.json();
      setContactRequests(data);
    };

    fetchContactRequests();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Your Contact Requests</h1>
      {contactRequests.length > 0 ? (
        contactRequests.map((request) => (
          <div key={request.id} className="mb-4 p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{request.topic}</h3>
            <p className="text-sm">{request.details}</p>
            <p className="text-sm text-gray-600">Contact: {request.contact}</p>
            <p className="text-sm text-gray-600">Status: {request.status}</p>
          </div>
        ))
      ) : (
        <p>No contact requests found.</p>
      )}
    </div>
  );
}
