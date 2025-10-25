import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Events table
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Academic, Sports, Cultural, Social
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  featured: integer("featured").default(0), // 0 or 1 for featured events
  createdAt: text("created_at").notNull(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Notices table
export const notices = pgTable("notices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // Important, General, Academic, Administrative
  priority: text("priority").notNull(), // High, Medium, Low
  createdAt: text("created_at").notNull(),
});

export const insertNoticeSchema = createInsertSchema(notices).omit({
  id: true,
  createdAt: true,
});

export type InsertNotice = z.infer<typeof insertNoticeSchema>;
export type Notice = typeof notices.$inferSelect;

// Complaints/Requests table
export const complaints = pgTable("complaints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(), // Academic, Infrastructure, Services, Other
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  status: text("status").notNull().default("Pending"), // Pending, Under Review, Resolved
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const insertComplaintSchema = createInsertSchema(complaints).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
export type Complaint = typeof complaints.$inferSelect;

// Feedback table
export const feedback = pgTable("feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  rating: integer("rating").notNull(), // 1-5
  categories: text("categories").notNull(), // Stored as comma-separated: Academics,Facilities,Events,Support,Other
  message: text("message").notNull(),
  anonymous: integer("anonymous").default(0), // 0 or 1
  name: text("name"),
  email: text("email"),
  createdAt: text("created_at").notNull(),
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
});

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;

// Club data (static for MVP)
export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  memberCount: number;
  logo: string;
  isActive: boolean;
}

// Project data (static for MVP)
export interface Project {
  id: string;
  name: string;
  clubId: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed";
  teamMembers: string[];
  startDate: string;
}

// Timetable data (static for MVP)
export interface ClassSession {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  faculty: string;
  type: "Lecture" | "Lab" | "Tutorial";
}

// Attendance data (static for MVP)
export interface AttendanceRecord {
  subject: string;
  total: number;
  attended: number;
  percentage: number;
}
