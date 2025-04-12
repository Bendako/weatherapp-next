"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2, SearchIcon } from "lucide-react";
import { searchCities } from "@/services/weather";
import { CitySuggestion } from "@/types/weather";

interface HeaderProps {
  onSearch: (city: string) => Promise<void>;
}

// Debounce helper function
// Use generics for better type safety: TArgs for arguments array type, TReturn for return type
function debounce<TArgs extends unknown[], TReturn>(
  func: (...args: TArgs) => TReturn,
  waitFor: number
) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: TArgs): Promise<TReturn> => { // Return a Promise of the original function's return type
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        // Resolve the promise with the result of the original function
        resolve(func(...args)); 
      }, waitFor);
    });
  };
}

export default function Header({ onSearch }: HeaderProps) {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLFormElement>(null);

  // Debounced version of fetch suggestions - use useMemo instead of useCallback
  const debouncedFetchSuggestions = useMemo(
    () => debounce(async (query: string) => {
      if (query.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        return; // Implicitly returns Promise<void>
      }
      setIsLoadingSuggestions(true);
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoadingSuggestions(false);
      }
      // Implicitly returns Promise<void>
    }, 300),
    [] // Dependencies for useMemo (state setters & imports are stable)
  );

  // Effect to fetch suggestions when search input changes
  useEffect(() => {
    // Call the memoized debounced function
    debouncedFetchSuggestions(search.trim());
  }, [search, debouncedFetchSuggestions]); // Keep dependencies for useEffect

  // Effect to handle clicks outside the search input/suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // Show suggestions immediately if input is long enough, debouncer will handle fetching
    if (e.target.value.trim().length >= 3) {
       // No need to explicitly setShowSuggestions(true) here, debouncer handles it
    } else {
      setShowSuggestions(false); // Hide if input becomes too short
    }
  };

  const handleSuggestionClick = async (suggestion: CitySuggestion) => {
    const displayName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    setSearch(displayName); // Update input field
    setSuggestions([]); // Clear suggestions
    setShowSuggestions(false); // Hide suggestions

    // Trigger the main search immediately
    if (!isSearching) {
        setIsSearching(true);
        try {
          await onSearch(displayName); // Use the full display name for search
        } finally {
          setIsSearching(false);
        }
      }
  };

  // Handle main search form submission
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() && !isSearching) {
      setShowSuggestions(false); // Hide suggestions on explicit search
      setSuggestions([]);
      setIsSearching(true);
      try {
        await onSearch(search.trim());
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80">
              <h1 className="text-2xl font-bold">Weather App</h1>
            </Link>
            <Link 
              href="/docs" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
          </div>
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-[400px]" ref={searchContainerRef}>
            <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search for a city..."
                  value={search}
                  onChange={handleInputChange}
                  onFocus={() => {
                    // Show suggestions on focus only if there are any and input is long enough
                    if (search.trim().length >= 3 && suggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  className="flex-1"
                  disabled={isSearching}
                  aria-autocomplete="list"
                  aria-controls="suggestions-list"
                  aria-expanded={showSuggestions}
                />
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching
                    </>
                  ) : (
                     <SearchIcon className="h-4 w-4" />
                  )}
                </Button>
            </div>

            {showSuggestions && (
                <ul
                  id="suggestions-list"
                  className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-background border border-border rounded-md shadow-lg z-20"
                  role="listbox"
                >
                  {isLoadingSuggestions ? (
                      <li className="px-4 py-2 text-muted-foreground flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                      </li>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <li
                        key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                        className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                        onMouseDown={(e) => e.preventDefault()}
                        role="option"
                        aria-selected="false"
                      >
                        {suggestion.name}
                        {suggestion.state && (
                          <span className="text-muted-foreground text-sm">, {suggestion.state}</span>
                        )}
                        <span className="text-muted-foreground text-sm">, {suggestion.country}</span>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-muted-foreground">No suggestions found</li>
                  )}
                </ul>
              )}
          </form>
        </div>
      </div>
    </header>
  );
} 