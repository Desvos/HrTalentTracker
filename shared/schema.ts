import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Location schema
export const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  city: z.string(),
  country: z.string()
});

// Education schema
export const educationSchema = z.object({
  institutionName: z.string(),
  degree: z.string(),
  graduationYear: z.number(),
  location: locationSchema
});

// Candidate schema
export const candidateSchema = z.object({
  id: z.number(),
  name: z.string(),
  currentLocation: locationSchema,
  education: z.array(educationSchema),
  skills: z.array(z.string()),
  role: z.string()
});

// Define the candidates table
export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  currentLocation: jsonb("current_location").notNull(),
  education: jsonb("education").notNull(),
  skills: jsonb("skills").notNull(),
  role: text("role").notNull()
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({ id: true });

export type Location = z.infer<typeof locationSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Candidate = z.infer<typeof candidateSchema>;
export type InsertCandidate = z.infer<typeof insertCandidateSchema>;

// User table for authentication (simplified for mock login)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  companyName: text("company_name"),
  password: text("password").notNull()
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
