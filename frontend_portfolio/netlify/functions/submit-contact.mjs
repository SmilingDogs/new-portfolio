import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2026-06-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { name = "", email = "", message = "" } = JSON.parse(event.body || "{}");

    if (!name.trim() || !email.trim() || !message.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Name, email, and message are required" }),
      };
    }

    await sanityClient.create({
      _type: "contact",
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to submit contact",
        details: error.message,
      }),
    };
  }
};
