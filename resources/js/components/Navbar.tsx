
import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { ThemeToggle } from "./ThemeProvider";
import { Menu, X, Compass } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary"
        >
          <Compass className="h-8 w-8 stroke-primary animate-pulse" />
          <span className={`${isScrolled ? "text-foreground" : "text-white text-shadow"}`}>
            TripVista
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className={`${isScrolled ? "text-foreground" : "text-white text-shadow"}`}>
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/"
                  className="relative py-2 hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="relative py-2 hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/agencies"
                  className="relative py-2 hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  Agencies
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="relative py-2 hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="relative py-2 hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-md focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg border-t border-border animate-fade-in">
          <nav className="container mx-auto py-4">
            <ul className="flex flex-col space-y-4 px-4">
              <li>
                <Link
                  href="/"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/agencies"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Agencies
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
