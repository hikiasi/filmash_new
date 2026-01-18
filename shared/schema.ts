import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Inquiries from the "Consultation" form
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  message: text("message"), // Optional topic or question
  isProcessed: boolean("is_processed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Orders from the "Order a Car" form
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  carMake: text("car_make").notNull(), // e.g. Toyota
  carModel: text("car_model").notNull(), // e.g. Camry
  year: text("year"), // Desired year
  budget: text("budget"), // Desired budget
  comments: text("comments"),
  isProcessed: boolean("is_processed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertInquirySchema = createInsertSchema(inquiries).pick({
  name: true,
  phone: true,
  message: true,
}).extend({
  name: z.string().min(2, "Имя слишком короткое"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  name: true,
  phone: true,
  carMake: true,
  carModel: true,
  year: true,
  budget: true,
  comments: true,
}).extend({
  name: z.string().min(2, "Имя слишком короткое"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  carMake: z.string().min(1, "Укажите марку автомобиля"),
  carModel: z.string().min(1, "Укажите модель автомобиля"),
});

// === EXPLICIT TYPES ===

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
