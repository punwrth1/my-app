import prisma from "@/utils/db"; // Ensure this is the correct import path for your prisma client

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extract id from the URL path

  const data = await req.json();
  const { status } = data;

  if (!id || !status) {
    return new Response(
      JSON.stringify({ error: "ID and status are required" }),
      { status: 400 }
    );
  }

  try {
    const updatedRequest = await prisma.contactUs.update({
      where: { id }, // Find the contact request by its ID
      data: { status }, // Update the status
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
