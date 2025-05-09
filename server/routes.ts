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

  const professionCache: any = {};
  async function getDistributionByProfession(profession: string) {
    profession = profession.toLowerCase().trim();
    if (professionCache[profession]) {
      return professionCache[profession];
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": "Genera dati sintetici ma plausibili sulla distribuzione geografica in Italia di una figura professionale specifica.\nDato in input un titolo professionale (es. \"Software Developer\", \"Infermiere\", \"Architetto\"), restituisci un array JSON di oggetti, ciascuno dei quali rappresenta una località italiana (il più possibile precisa e coerente con il contesto professionale).\nOgni oggetto deve avere due campi:\n\"place\": il nome della località (in minuscolo, senza accenti, es. \"napoli\"),\n\"distribution\": un numero decimale maggiore di 0 e minore o uguale a 1, che rappresenta la quota (in proporzione) di professionisti presenti in quella località. La somma dei valori \"distribution\" dell'intero array deve essere esattamente 1.\nIl numero di località può variare, assicurati tuttavia che ci sia un numero ragionevole di risultati, almeno 10, ma deve riflettere la realisticità della distribuzione della professione (es. per \"Ricercatore universitario\", concentrarsi su città universitarie, ecc.).Assicurati che la città sia esistente (non usare raggruppamenti come \"altre citta\" ma usa solo nomi di città italiane). Assicurati che le città siano ripetute una sola volta, ovvero i risultati devono essere univoci per place.\nRestituisci solo l'array JSON, senza ulteriori spiegazioni o testo."
            },
            {
              "text": profession
            }
          ]
        }
      ]
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const req = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAlVWUWu0jBTqjqaV9ofC9MD2wndggW_go", requestOptions as any);

    const res = await req.json();
    const data = res.candidates[0].content.parts[0].text;
    // data may start with "```json" and end with "```", remove them
    const start = data.indexOf("[");
    const end = data.lastIndexOf("]");
    const json = data.substring(start, end + 1);
    // parse the json
    const ret = JSON.parse(json);
    professionCache[profession] = ret;
    return ret;
  }

  const placeToCoordinates: any = {};
  async function getCoordinatesByPlace(place: string) {
    if (placeToCoordinates[place]) {
      return placeToCoordinates[place];
    }
    const res = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(place)}&format=jsonv2`);
    const data = await res.json();
    if (data.length === 0) {
      throw new Error(`No coordinates found for place: ${place}`);
    }
    const { lat, lon } = data[0];
    placeToCoordinates[place] = { lat, lon };
    return { lat, lon };
  }

  // Enable CORS for localhost:5173
  app.get('/api/distribution', async (req, res) => {
    try {
      const { profession } = req.query;
      if (!profession) {
        return res.status(400).json({ error: 'Profession is required' });
      }

      const distribution = await getDistributionByProfession(profession as string);
      for (const place of distribution) {
        const coordinates = await getCoordinatesByPlace(place.place);
        place.coordinates = coordinates;
      }

      res.json(distribution);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/resume/:name', (req, res) => {
    res.sendFile(__dirname + '/resume_sample.pdf');
  });

  const httpServer = createServer(app);

  return httpServer;
}
