import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import SidebarMenu from "./SidebarMenu";
import { MapPin, User, ChevronDown, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = () => {
    if (!user?.fullName) return "U";
    return user.fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="ant-header h-16 sticky top-0 z-20">
        <div className="logo flex items-center">
          <MapPin className="text-primary mr-2" size={24} />
          <span>TalentMatch.ai</span>
        </div>

        <div className="flex md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="p-4 border-b">
                <div className="logo flex items-center">
                  <MapPin className="text-primary mr-2" size={24} />
                  <span>TalentMatch.ai</span>
                </div>
              </div>
              <SidebarMenu />
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="/dashboard"
            className={`text-muted-foreground hover:text-primary transition-colors ${
              location === "/dashboard" ? "text-primary" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            Dashboard
          </a>
          <a
            href="/pricing"
            className={`text-muted-foreground hover:text-primary transition-colors ${
              location === "/pricing" ? "text-primary" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              navigate("/pricing");
            }}
          >
            Pricing
          </a>
          <div className="pl-4 border-l border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <span>{user?.fullName || "User"}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - hidden on mobile */}
        <aside className="ant-sider w-64 hidden md:block">
          <SidebarMenu />
        </aside>

        {/* Main Content */}
        <main className="ant-content flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
