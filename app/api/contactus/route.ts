// pages/api/contactus.ts or app/api/contactus/route.ts

import prisma from "@/utils/db";

// GET - Fetch all contact requests
export async function GET() {
  try {
    const contactRequests = await prisma.contactUs.findMany();
    return new Response(JSON.stringify(contactRequests), { status: 200 });
  } catch (error) {
    console.error("Error fetching contact requests:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch contact requests" }),
      { status: 500 }
    );
  }
}

// POST - Create a new contact request
export async function POST(req: Request) {
  const data = await req.json();
  try {
    const newRequest = await prisma.contactUs.create({
      data: {
        topic: data.topic,
        details: data.details,
        contact: data.contact,
        status: "pending",  // Default status of "pending"
      },
    });
    return new Response(JSON.stringify(newRequest), { status: 201 });
  } catch (error) {
    console.error("Error creating contact request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to submit contact request" }),
      { status: 500 }
    );
  }
}

// PUT - Update the status of a contact request
export async function PUT(req: Request) {
  const data = await req.json();
  const { id, status } = data;

  if (!id || !status) {
    return new Response(
      JSON.stringify({ error: "ID and status are required" }),
      { status: 400 }
    );
  }

  try {
    const updatedRequest = await prisma.contactUs.update({
      where: { id },
      data: { status },
    });
    return new Response(JSON.stringify(updatedRequest), { status: 200 });
  } catch (error) {
    console.error("Error updating contact request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update contact request" }),
      { status: 500 }
    );
  }
}

// DELETE - Delete a contact request
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(
      JSON.stringify({ error: "ID is required" }),
      { status: 400 }
    );
  }

  try {
    await prisma.contactUs.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting contact request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete contact request" }),
      { status: 500 }
    );
  }
}
