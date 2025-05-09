import { Card, CardContent } from '@/components/ui/card';

const MapLegend = () => {
  return (
    <Card className="mb-6">
      <CardContent className="py-4 flex items-center space-x-8">
        <div className="text-lg font-medium">Map Legend:</div>
        
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
          <span>Candidate Location</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold mr-2">
            <span>15</span>
          </div>
          <span>Talent Hotspot (number indicates candidate count)</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapLegend;
