import { useEffect, useState, FormEvent } from 'react';
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
  skills: string[];
  institutions: string[];
}

const CandidateFilters = ({ onFilterChange }: CandidateFiltersProps) => {
  const [filterData, setFilterData] = useState<FilterData>({
    skills: [],
    institutions: []
  });
  const [roleSearch, setRoleSearch] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all_skills');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('all_institutions');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch filter data (unique skills and institutions)
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest('GET', '/api/filters-data');
        setFilterData(response.data);
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
      role: roleSearch.trim() || undefined,
      skill: selectedSkill === 'all_skills' ? undefined : selectedSkill,
      institution: selectedInstitution === 'all_institutions' ? undefined : selectedInstitution
    };
    
    onFilterChange(filters);
  }, [roleSearch, selectedSkill, selectedInstitution, onFilterChange]);

  const handleRoleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await apiRequest('GET', '/api/filters-data', {
        params: { role: roleSearch.trim() }
      });
      setFilterData(response.data);
    } catch (error) {
      console.error('Errore durante la ricerca del ruolo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role-search">Cerca per Ruolo</Label>
            <form onSubmit={handleRoleSearch} className="relative">
              <input
                id="role-search"
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Inserisci il ruolo (es. Software Engineer)"
                value={roleSearch}
                onChange={(e) => setRoleSearch(e.target.value)}
                disabled={isLoading}
              />
              {roleSearch && (
                <button
                  type="button"
                  className="absolute right-2 top-0 h-10 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setRoleSearch('');
                    handleRoleSearch(new Event('submit') as unknown as FormEvent);
                  }}
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="absolute right-10 top-0 h-10 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                🔍
              </button>
            </form>
          </div>
          
          <div className="space-y-2">
            <Label>Filtra per Competenze</Label>
            <Select
              value={selectedSkill}
              onValueChange={setSelectedSkill}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tutte le Competenze" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_skills">Tutte le Competenze</SelectItem>
                {filterData.skills.map((skill) => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Filtra per Istituzione</Label>
            <Select
              value={selectedInstitution}
              onValueChange={setSelectedInstitution}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tutte le Istituzioni" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_institutions">Tutte le Istituzioni</SelectItem>
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
