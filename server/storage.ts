import { db } from "./db";
import { contactMessages, type InsertContactMessage, type ContactMessage } from "@shared/schema";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [inserted] = await db.insert(contactMessages).values(message).returning();
    return inserted;
  }
}

export const storage = new DatabaseStorage();
