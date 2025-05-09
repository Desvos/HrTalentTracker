import { candidates, type Candidate, type InsertCandidate, users, type User, type InsertUser } from "@shared/schema";
import { generateMockCandidates } from "@/lib/data";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private candidates: Map<number, Candidate>;
  currentUserId: number;
  currentCandidateId: number;

  constructor() {
    this.users = new Map();
    this.candidates = new Map();
    this.currentUserId = 1;
    this.currentCandidateId = 1;

    // Generate and store mock candidates
    const mockCandidates = generateMockCandidates(500);
    mockCandidates.forEach(candidate => {
      this.candidates.set(candidate.id, candidate);
      this.currentCandidateId = Math.max(this.currentCandidateId, candidate.id + 1);
    });

    // Create a default user for testing
    this.createUser({
      username: "admin",
      email: "admin@example.com",
      fullName: "Admin User",
      companyName: "HR Solutions Inc",
      password: "password123"
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCandidates(): Promise<Candidate[]> {
    return Array.from(this.candidates.values());
  }

  async getCandidateById(id: number): Promise<Candidate | undefined> {
    return this.candidates.get(id);
  }

  async filterCandidates(filters: {
    role?: string;
    skill?: string;
    institution?: string;
  }): Promise<Candidate[]> {
    let filteredCandidates = Array.from(this.candidates.values());

    if (filters.role) {
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.role === filters.role
      );
    }

    if (filters.skill) {
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.skills.includes(filters.skill!)
      );
    }

    if (filters.institution) {
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.education.some(
          edu => edu.institutionName === filters.institution
        )
      );
    }

    return filteredCandidates;
  }
}

export const storage = new MemStorage();
