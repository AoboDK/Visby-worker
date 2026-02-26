import { db } from "./db";
import { contactMessages } from "@shared/schema";

async function seed() {
  console.log("Checking if database needs seeding...");
  const existing = await db.select().from(contactMessages);
  if (existing.length === 0) {
    console.log("Seeding initial contact messages...");
    await db.insert(contactMessages).values([
      {
        name: "Lars Jensen",
        email: "lars.jensen@example.dk",
        phone: "+45 20 12 34 56",
        company: "Nordic Trading AS",
        message: "We need help migrating 50 users from Google Workspace to MS365."
      },
      {
        name: "Astrid Lindgren",
        email: "astrid@designstudio.se",
        message: "Looking for an IT support partner for our new office in Stockholm."
      }
    ]);
    console.log("Database seeded successfully");
  } else {
    console.log("Database already seeded");
  }
}

seed().catch(console.error).finally(() => process.exit(0));
