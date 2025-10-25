import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Events" },
  { path: "/complaints", label: "Complaints" },
  { path: "/timetable", label: "Timetable" },
  { path: "/clubs", label: "Clubs" },
  { path: "/feedback", label: "Feedback" },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/">
            <button
              className="flex items-center gap-2 font-display text-xl font-bold text-foreground hover-elevate rounded-lg px-3 py-2 -ml-3"
              data-testid="link-home"
            >
              <GraduationCap className="h-7 w-7 text-primary" />
              <span className="hidden sm:inline">Campus Connect</span>
            </button>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover-elevate ${
                    location === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <button
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors hover-elevate ${
                    location === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
