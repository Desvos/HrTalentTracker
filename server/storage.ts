import { candidates, type Candidate, type InsertCandidate, users, type User, type InsertUser } from "@shared/schema";
import { generateMockCandidates } from "@/lib/data";
import { db } from "./db";
import { eq, like, inArray, SQL, sql } from "drizzle-orm";

// Modify the interface with any CRUD methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllCandidates(): Promise<Candidate[]>;
  getCandidateById(id: number): Promise<Candidate | undefined>;
  filterCandidates(filters: {
    role?: string;
    skill?: string;
    institution?: string;
  }): Promise<Candidate[]>;
  populateInitialData(): Promise<void>;
  isInitialized(): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  
  // Check if the database has already been initialized with data
  async isInitialized(): Promise<boolean> {
    const count = await db.select({ count: sql<number>`count(*)` })
      .from(candidates);
    return count[0].count > 0;
  }
  
  // Initialize the database with mock data
  async populateInitialData(): Promise<void> {
    // Create a default admin user
    const adminExists = await this.getUserByEmail("admin@example.com");
    if (!adminExists) {
      await this.createUser({
        username: "admin",
        email: "admin@example.com",
        fullName: "Admin User",
        companyName: "HR Solutions Inc",
        password: "password123"
      });
    }
    
    // Generate and store mock candidates
    const mockCandidates = generateMockCandidates(500);
    for (const candidate of mockCandidates) {
      await db.insert(candidates).values({
        name: candidate.name,
        currentLocation: candidate.currentLocation,
        education: candidate.education,
        skills: candidate.skills,
        role: candidate.role
      });
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        companyName: insertUser.companyName || null
      })
      .returning();
    return user;
  }

  async getAllCandidates(): Promise<Candidate[]> {
    const dbCandidates = await db.select().from(candidates);
    // Ensure proper typing for the returned results
    return dbCandidates.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      currentLocation: candidate.currentLocation as unknown as Candidate['currentLocation'],
      education: candidate.education as unknown as Candidate['education'],
      skills: candidate.skills as unknown as string[]
    }));
  }

  async getCandidateById(id: number): Promise<Candidate | undefined> {
    const results = await db
      .select()
      .from(candidates)
      .where(eq(candidates.id, id));
    
    if (!results.length) return undefined;
    
    const candidate = results[0];
    return {
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      currentLocation: candidate.currentLocation as unknown as Candidate['currentLocation'],
      education: candidate.education as unknown as Candidate['education'],
      skills: candidate.skills as unknown as string[]
    };
  }

  async filterCandidates(filters: {
    role?: string;
    skill?: string;
    institution?: string;
  }): Promise<Candidate[]> {
    // First get candidates with basic filtering
    let baseQuery = db.select().from(candidates);
    
    // Apply role filter at DB level if possible
    if (filters.role) {
      // Use case-insensitive partial text matching instead of exact matching
      baseQuery = baseQuery.where(
        sql`lower(${candidates.role}) like lower(${'%' + filters.role + '%'})`
      );
    }
    
    // Get properly typed candidate results
    const typedCandidates = (await baseQuery).map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      currentLocation: candidate.currentLocation as unknown as Candidate['currentLocation'],
      education: candidate.education as unknown as Candidate['education'],
      skills: candidate.skills as unknown as string[]
    }));
    
    let results = typedCandidates;
    
    // Filter by skill (done in memory since it's a JSON array)
    if (filters.skill) {
      results = results.filter(candidate => 
        candidate.skills.includes(filters.skill!)
      );
    }
    
    // Filter by institution (done in memory since it's a nested JSON field)
    if (filters.institution) {
      results = results.filter(candidate => 
        candidate.education.some(edu => 
          edu.institutionName === filters.institution
        )
      );
    }
    
    return results;
  }
}

// Initialize storage
export const storage = new DatabaseStorage();
