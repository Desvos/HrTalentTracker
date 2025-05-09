import { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Map, 
  Users, 
  School, 
  PieChart, 
  Settings, 
  Search 
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const SidebarMenu = () => {
  const [location, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  
  const menuItems = [
    { icon: <Map size={18} />, label: 'Talent Map', path: '/dashboard' },
    { icon: <Users size={18} />, label: 'Candidates', path: '/candidates' },
    { icon: <School size={18} />, label: 'Institutions', path: '/institutions' },
    { icon: <PieChart size={18} />, label: 'Analytics', path: '/analytics' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/settings' }
  ];
  
  return (
    <div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="menu">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className={`menu-item ${location === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarMenu;
