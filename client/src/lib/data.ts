import { Candidate, Location, Education } from '@shared/schema';

// List of common roles
const roles = [
  'Software Engineer',
  'Data Analyst',
  'Product Manager',
  'UX Designer',
  'HR Specialist',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Marketing Manager',
  'Sales Representative',
  'Project Manager',
  'Business Analyst',
  'QA Engineer',
  'Technical Writer',
  'Security Engineer',
  'Systems Administrator',
  'Database Administrator',
  'Data Scientist',
  'Machine Learning Engineer',
  'Mobile Developer'
];

// List of common skills
const skills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'MongoDB',
  'GraphQL', 'Docker', 'AWS', 'Azure', 'Git', 'TypeScript', 'Vue.js',
  'Angular', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go',
  'Data Analysis', 'Machine Learning', 'Project Management', 'Leadership',
  'Communication', 'Problem Solving', 'Customer Service', 'Agile',
  'Scrum', 'UI/UX Design', 'Figma', 'Adobe XD', 'Sketch',
  'Marketing', 'Sales', 'Content Creation', 'SEO', 'Social Media',
  'Public Speaking', 'Negotiation', 'Strategic Planning', 'Budgeting',
  'Team Management', 'Recruitment', 'Training'
];

// List of major cities with lat/lng
const cities: { city: string; country: string; lat: number; lng: number }[] = [
  { city: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060 },
  { city: 'San Francisco', country: 'USA', lat: 37.7749, lng: -122.4194 },
  { city: 'Seattle', country: 'USA', lat: 47.6062, lng: -122.3321 },
  { city: 'Boston', country: 'USA', lat: 42.3601, lng: -71.0589 },
  { city: 'Austin', country: 'USA', lat: 30.2672, lng: -97.7431 },
  { city: 'Chicago', country: 'USA', lat: 41.8781, lng: -87.6298 },
  { city: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437 },
  { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
  { city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946 },
  { city: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603 },
  { city: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041 },
  { city: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686 },
  { city: 'Zurich', country: 'Switzerland', lat: 47.3769, lng: 8.5417 },
  { city: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 }
];

// List of universities with lat/lng
const universities: { name: string; city: string; country: string; lat: number; lng: number }[] = [
  { name: 'Stanford University', city: 'Stanford', country: 'USA', lat: 37.4275, lng: -122.1697 },
  { name: 'MIT', city: 'Cambridge', country: 'USA', lat: 42.3601, lng: -71.0942 },
  { name: 'Harvard University', city: 'Cambridge', country: 'USA', lat: 42.3770, lng: -71.1167 },
  { name: 'University of California, Berkeley', city: 'Berkeley', country: 'USA', lat: 37.8719, lng: -122.2585 },
  { name: 'University of Washington', city: 'Seattle', country: 'USA', lat: 47.6553, lng: -122.3035 },
  { name: 'Carnegie Mellon University', city: 'Pittsburgh', country: 'USA', lat: 40.4432, lng: -79.9428 },
  { name: 'University of Michigan', city: 'Ann Arbor', country: 'USA', lat: 42.2808, lng: -83.7430 },
  { name: 'University of Texas', city: 'Austin', country: 'USA', lat: 30.2849, lng: -97.7341 },
  { name: 'Georgia Tech', city: 'Atlanta', country: 'USA', lat: 33.7756, lng: -84.3963 },
  { name: 'Oxford University', city: 'Oxford', country: 'UK', lat: 51.7520, lng: -1.2577 },
  { name: 'Cambridge University', city: 'Cambridge', country: 'UK', lat: 52.2054, lng: 0.1132 },
  { name: 'Imperial College London', city: 'London', country: 'UK', lat: 51.4988, lng: -0.1749 },
  { name: 'ETH Zurich', city: 'Zurich', country: 'Switzerland', lat: 47.3763, lng: 8.5487 },
  { name: 'University of Toronto', city: 'Toronto', country: 'Canada', lat: 43.6629, lng: -79.3957 },
  { name: 'National University of Singapore', city: 'Singapore', country: 'Singapore', lat: 1.2966, lng: 103.7764 },
  { name: 'Tsinghua University', city: 'Beijing', country: 'China', lat: 40.0000, lng: 116.3264 },
  { name: 'University of Tokyo', city: 'Tokyo', country: 'Japan', lat: 35.7128, lng: 139.7621 },
  { name: 'Technical University of Munich', city: 'Munich', country: 'Germany', lat: 48.1496, lng: 11.5678 },
  { name: 'University of Melbourne', city: 'Melbourne', country: 'Australia', lat: -37.7981, lng: 144.9600 },
  { name: 'Indian Institute of Technology', city: 'Delhi', country: 'India', lat: 28.5456, lng: 77.1926 }
];

// List of common degrees
const degrees = [
  'Bachelor of Science in Computer Science',
  'Bachelor of Arts in Economics',
  'Bachelor of Science in Data Science',
  'Bachelor of Science in Business Administration',
  'Bachelor of Arts in Communications',
  'Bachelor of Science in Engineering',
  'Master of Science in Computer Science',
  'Master of Business Administration',
  'Master of Science in Data Analytics',
  'Master of Arts in Design',
  'Ph.D in Computer Science',
  'Associate Degree in Information Technology'
];

// Helper functions
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomGraduationYear = (): number => {
  return getRandomInt(2000, 2023);
};

const generateLocation = (useCity = true): Location => {
  if (useCity) {
    const city = getRandomElement(cities);
    return {
      latitude: city.lat,
      longitude: city.lng,
      city: city.city,
      country: city.country
    };
  } else {
    // Add small random offset to prevent exact overlap
    const university = getRandomElement(universities);
    return {
      latitude: university.lat + (Math.random() - 0.5) * 0.01,
      longitude: university.lng + (Math.random() - 0.5) * 0.01,
      city: university.city,
      country: university.country
    };
  }
};

const generateEducation = (count: number): Education[] => {
  const educationList: Education[] = [];
  const usedUniversities = new Set<number>();
  
  for (let i = 0; i < count; i++) {
    // Pick a university that hasn't been used for this candidate yet
    let universityIndex: number;
    do {
      universityIndex = Math.floor(Math.random() * universities.length);
    } while (usedUniversities.has(universityIndex) && usedUniversities.size < universities.length);
    
    usedUniversities.add(universityIndex);
    const university = universities[universityIndex];
    
    educationList.push({
      institutionName: university.name,
      degree: getRandomElement(degrees),
      graduationYear: getRandomGraduationYear(),
      location: {
        latitude: university.lat,
        longitude: university.lng,
        city: university.city,
        country: university.country
      }
    });
  }
  
  return educationList;
};

export const generateMockCandidates = (count: number): Candidate[] => {
  const candidates: Candidate[] = [];
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma', 'Robert', 'Olivia', 'William', 'Sophia', 'Joseph', 'Isabella', 'Thomas', 'Mia', 'Daniel', 'Charlotte', 'Matthew', 'Amelia'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  
  for (let i = 1; i <= count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const role = getRandomElement(roles);
    const numSkills = getRandomInt(2, 5);
    const numEducation = getRandomInt(1, 3);
    
    candidates.push({
      id: i,
      name: `${firstName} ${lastName}`,
      currentLocation: generateLocation(true),
      education: generateEducation(numEducation),
      skills: getRandomElements(skills, numSkills),
      role: role
    });
  }
  
  return candidates;
};

// Utility function to get talent hotspots from candidate data
export const getTalentHotspots = (candidates: Candidate[] | null) => {
  if (!candidates || !Array.isArray(candidates)) {
    return []; // Return empty array if candidates is null or not an array
  }
  
  const hotspotMap = new Map<string, { count: number; location: Location }>();
  
  // Count each institution occurrence
  candidates.forEach(candidate => {
    candidate.education.forEach(edu => {
      const institutionName = edu.institutionName;
      if (hotspotMap.has(institutionName)) {
        const current = hotspotMap.get(institutionName)!;
        hotspotMap.set(institutionName, {
          count: current.count + 1,
          location: current.location
        });
      } else {
        hotspotMap.set(institutionName, {
          count: 1,
          location: edu.location
        });
      }
    });
  });
  
  // Convert to array and filter for significant hotspots (more than 3 candidates)
  return Array.from(hotspotMap.entries())
    .filter(([_, data]) => data.count >= 3)
    .map(([name, data]) => ({
      name,
      count: data.count,
      location: data.location
    }))
    .sort((a, b) => b.count - a.count);
};
