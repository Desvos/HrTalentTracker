import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
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
  
  // Construct API URL with filters
  const getApiUrl = () => {
    const baseUrl = '/api/candidates';
    const params = new URLSearchParams();
    
    if (filters.role) params.append('role', filters.role);
    if (filters.skill) params.append('skill', filters.skill);
    if (filters.institution) params.append('institution', filters.institution);
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };
  
  // Fetch candidates with filters
  const {
    data: candidates = [],
    isLoading,
    isError,
    refetch
  } = useQuery<Candidate[]>({
    queryKey: [getApiUrl()],
    refetchOnWindowFocus: false,
  });
  
  // Refetch when filters change
  useEffect(() => {
    refetch();
  }, [filters, refetch]);
  
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
          <CandidateMap candidates={candidates} />
          <MapLegend />
          <CandidateTable candidates={candidates} />
        </>
      )}
    </AppLayout>
  );
};

export default DashboardPage;
