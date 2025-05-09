import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
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

// Schema per i CV
export const cvs = pgTable('cvs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  originalFileName: text('original_file_name').notNull(),
  filePath: text('file_path').notNull(),
  fileType: text('file_type').notNull(),
  fileSize: integer('file_size').notNull(),
  extractedData: jsonb('extracted_data').notNull(), // Dati estratti dall'OCR
  status: text('status').notNull().default('pending'), // pending, processing, completed, error
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export type CV = typeof cvs.$inferSelect;
export type InsertCV = typeof cvs.$inferInsert;

// Schema per i CV pubblici
export const publicCVs = pgTable('public_cvs', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  originalFileName: text('original_file_name').notNull(),
  filePath: text('file_path').notNull(),
  fileType: text('file_type').notNull(),
  fileSize: integer('file_size').notNull(),
  extractedData: jsonb('extracted_data').notNull(), // Dati estratti dall'OCR
  status: text('status').notNull().default('pending'), // pending, processing, completed, error
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export type PublicCV = typeof publicCVs.$inferSelect;
export type InsertPublicCV = typeof publicCVs.$inferInsert;
