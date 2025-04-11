"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface HeaderProps {
  onSearch: (city: string) => Promise<void>;
}

export default function Header({ onSearch }: HeaderProps) {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() && !isSearching) {
      setIsSearching(true);
      try {
        await onSearch(search.trim());
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <header className="border-b">
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
          <form onSubmit={handleSearch} className="flex w-full sm:w-[400px] gap-2">
            <Input
              type="text"
              placeholder="Search for a city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
              disabled={isSearching}
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching
                </>
              ) : (
                'Search'
              )}
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
} 