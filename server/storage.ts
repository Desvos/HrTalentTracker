import { candidates, type Candidate, type InsertCandidate, users, type User, type InsertUser, cvs, type CV, type InsertCV, publicCVs, type PublicCV, type InsertPublicCV } from "@shared/schema";
import { generateMockCandidates } from "@/lib/data";
import { db } from "./db";
import { eq, like, inArray, SQL, sql, desc } from "drizzle-orm";

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
  createCV(cv: InsertCV): Promise<CV>;
  getCVById(id: number): Promise<CV | undefined>;
  getCVsByUserId(userId: number): Promise<CV[]>;
  updateCVStatus(id: number, status: string, errorMessage?: string): Promise<CV>;
  createPublicCV(cv: InsertPublicCV): Promise<PublicCV>;
  getPublicCVById(id: number): Promise<PublicCV | undefined>;
  getPublicCVs(): Promise<PublicCV[]>;
  updatePublicCVStatus(id: number, status: string, errorMessage?: string): Promise<PublicCV>;
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
    // Get all candidates first
    const typedCandidates = (await db.select().from(candidates)).map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      currentLocation: candidate.currentLocation as unknown as Candidate['currentLocation'],
      education: candidate.education as unknown as Candidate['education'],
      skills: candidate.skills as unknown as string[]
    }));
    
    let results = typedCandidates;
    
    // Filter by role (case-insensitive partial match)
    if (filters.role) {
      const searchTerm = filters.role.toLowerCase();
      results = results.filter(candidate => 
        candidate.role.toLowerCase().includes(searchTerm)
      );
    }
    
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

  async createCV(cv: InsertCV): Promise<CV> {
    const [newCV] = await db
      .insert(cvs)
      .values(cv)
      .returning();
    return newCV;
  }

  async getCVById(id: number): Promise<CV | undefined> {
    const results = await db
      .select()
      .from(cvs)
      .where(eq(cvs.id, id));
    return results[0];
  }

  async getCVsByUserId(userId: number): Promise<CV[]> {
    return await db
      .select()
      .from(cvs)
      .where(eq(cvs.userId, userId))
      .orderBy(desc(cvs.createdAt));
  }

  async updateCVStatus(id: number, status: string, errorMessage?: string): Promise<CV> {
    const [updatedCV] = await db
      .update(cvs)
      .set({
        status,
        errorMessage,
        updatedAt: new Date()
      })
      .where(eq(cvs.id, id))
      .returning();
    return updatedCV;
  }

  async createPublicCV(cv: InsertPublicCV): Promise<PublicCV> {
    const [newCV] = await db
      .insert(publicCVs)
      .values(cv)
      .returning();
    return newCV;
  }

  async getPublicCVById(id: number): Promise<PublicCV | undefined> {
    const results = await db
      .select()
      .from(publicCVs)
      .where(eq(publicCVs.id, id));
    return results[0];
  }

  async getPublicCVs(): Promise<PublicCV[]> {
    return await db
      .select()
      .from(publicCVs)
      .orderBy(desc(publicCVs.createdAt));
  }

  async updatePublicCVStatus(id: number, status: string, errorMessage?: string): Promise<PublicCV> {
    const [updatedCV] = await db
      .update(publicCVs)
      .set({
        status,
        errorMessage,
        updatedAt: new Date()
      })
      .where(eq(publicCVs.id, id))
      .returning();
    return updatedCV;
  }
}

// Initialize storage
export const storage = new DatabaseStorage();
