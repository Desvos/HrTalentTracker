import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { apiRequest } from '@/lib/queryClient';

interface CandidateFiltersProps {
  onFilterChange: (filters: { role?: string; skill?: string; institution?: string }) => void;
}

interface FilterData {
  roles: string[];
  skills: string[];
  institutions: string[];
}

const CandidateFilters = ({ onFilterChange }: CandidateFiltersProps) => {
  const [filterData, setFilterData] = useState<FilterData>({
    roles: [],
    skills: [],
    institutions: []
  });
  const [selectedRole, setSelectedRole] = useState<string>('all_roles');
  const [selectedSkill, setSelectedSkill] = useState<string>('all_skills');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('all_institutions');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch filter data (unique roles, skills, and institutions)
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest('GET', '/api/filters-data');
        const data = await response.json();
        setFilterData(data);
      } catch (error) {
        console.error('Error fetching filter data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFilterData();
  }, []);
  
  // Handle filter changes
  useEffect(() => {
    const filters = {
      role: selectedRole === 'all_roles' ? undefined : selectedRole,
      skill: selectedSkill === 'all_skills' ? undefined : selectedSkill,
      institution: selectedInstitution === 'all_institutions' ? undefined : selectedInstitution
    };
    
    onFilterChange(filters);
  }, [selectedRole, selectedSkill, selectedInstitution, onFilterChange]);
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role-search">Search by Role</Label>
            <div className="relative">
              <input
                id="role-search"
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter role (e.g. Software Engineer)"
                value={selectedRole === 'all_roles' ? '' : selectedRole}
                onChange={(e) => setSelectedRole(e.target.value || 'all_roles')}
                disabled={isLoading}
              />
              {selectedRole !== 'all_roles' && (
                <button
                  type="button"
                  className="absolute right-2 top-0 h-10 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedRole('all_roles')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Filter by Skills</Label>
            <Select
              value={selectedSkill}
              onValueChange={setSelectedSkill}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_skills">All Skills</SelectItem>
                {filterData.skills.map((skill) => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Filter by Institution</Label>
            <Select
              value={selectedInstitution}
              onValueChange={setSelectedInstitution}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Institutions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_institutions">All Institutions</SelectItem>
                {filterData.institutions.map((institution) => (
                  <SelectItem key={institution} value={institution}>{institution}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateFilters;
