import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AppLayout from '@/components/layout/AppLayout';
import CandidateMap from '@/components/dashboard/CandidateMap';
import CandidateFilters from '@/components/dashboard/CandidateFilters';
import CandidateTable from '@/components/dashboard/CandidateTable';
import MapLegend from '@/components/dashboard/MapLegend';
import { apiRequest } from '@/lib/queryClient';
import { Candidate } from '@shared/schema';

const DashboardPage = () => {
  const [filters, setFilters] = useState<{
    role?: string;
    skill?: string;
    institution?: string;
  }>({});
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch candidates solo all'avvio della pagina
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest('GET', '/api/candidates');
        setCandidates(response.data);
        setIsError(false);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []); // Array vuoto = solo all'avvio

  // Filtra i candidati lato client
  const filteredCandidates = candidates.filter(candidate => {
    if (filters.role && candidate.role !== filters.role) return false;
    if (filters.skill && !candidate.skills.includes(filters.skill)) return false;
    if (filters.institution && !candidate.education.some(edu => edu.institutionName === filters.institution)) return false;
    return true;
  });
  
  const handleFilterChange = (newFilters: { role?: string; skill?: string; institution?: string }) => {
    setFilters(newFilters);
  };
  
  return (
    <AppLayout>
      <Helmet>
        <title>Dashboard | HR Talent Mapper</title>
        <meta name="description" content="Interactive talent mapping dashboard for HR professionals to visualize candidate distribution and talent hotspots." />
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Talent Dashboard</h1>
        <p className="text-muted-foreground">Interactive visualization of your talent pool and recruitment hotspots</p>
      </div>
      
      <CandidateFilters onFilterChange={handleFilterChange} />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-[600px] bg-white rounded-lg shadow-sm">
          <p>Loading candidate data...</p>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-[600px] bg-white rounded-lg shadow-sm">
          <p className="text-destructive">Error loading candidate data. Please try again.</p>
        </div>
      ) : (
        <>
          <CandidateMap candidates={filteredCandidates} />
          <MapLegend />
          <CandidateTable candidates={filteredCandidates} />
        </>
      )}
    </AppLayout>
  );
};

export default DashboardPage;
