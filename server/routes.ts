import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Put application routes here
  // Prefix all routes with /api

  // User authentication routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      console.log('Login attempt:', { email, password });
      
      if (!email || !password) {
        console.log('Missing credentials');
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      console.log('User found:', user ? 'yes' : 'no');
      
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verifica la password (in un'app reale, usa bcrypt o simili)
      console.log('Password check:', { 
        provided: password, 
        stored: user.password,
        match: user.password === password 
      });
      
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // In a real app, you would use proper authentication with JWT or sessions
      // For this mock, we'll just return the user without the password
      const { password: _, ...userWithoutPassword } = user;
      
      // Set session cookie
      req.session.userId = user.id;
      
      console.log('Login successful for user:', userWithoutPassword);
      
      return res.status(200).json({ 
        message: "Login successful",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/signup", async (req: Request, res: Response) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }

      const existingUser = await storage.getUserByEmail(result.data.email);
      
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
      }

      const newUser = await storage.createUser(result.data);
      
      // Don't return the password
      const { password: _, ...userWithoutPassword } = newUser;
      
      return res.status(201).json({
        message: "User created successfully",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Candidate routes
  app.get("/api/candidates", async (req: Request, res: Response) => {
    try {
      const role = req.query.role as string | undefined;
      const skill = req.query.skill as string | undefined;
      const institution = req.query.institution as string | undefined;
      
      const candidates = await storage.filterCandidates({ 
        role, 
        skill, 
        institution 
      });
      
      return res.status(200).json(candidates);
    } catch (error) {
      console.error("Get candidates error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/candidates/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid candidate ID" });
      }
      
      const candidate = await storage.getCandidateById(id);
      
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
      
      return res.status(200).json(candidate);
    } catch (error) {
      console.error("Get candidate error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Helper route to get unique institutions, roles, and skills for filters
  app.get("/api/filters-data", async (req: Request, res: Response) => {
    try {
      const candidates = await storage.getAllCandidates();
      
      // Get unique roles
      const uniqueRoles: string[] = [];
      candidates.forEach(c => {
        if (!uniqueRoles.includes(c.role)) {
          uniqueRoles.push(c.role);
        }
      });
      
      // Get unique skills
      const uniqueSkills: string[] = [];
      candidates.forEach(c => {
        c.skills.forEach(skill => {
          if (!uniqueSkills.includes(skill)) {
            uniqueSkills.push(skill);
          }
        });
      });
      
      // Get unique institutions
      const uniqueInstitutions: string[] = [];
      candidates.forEach(c => {
        c.education.forEach(edu => {
          if (!uniqueInstitutions.includes(edu.institutionName)) {
            uniqueInstitutions.push(edu.institutionName);
          }
        });
      });
      
      return res.status(200).json({
        roles: uniqueRoles,
        skills: uniqueSkills,
        institutions: uniqueInstitutions
      });
    } catch (error) {
      console.error("Get filters data error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
