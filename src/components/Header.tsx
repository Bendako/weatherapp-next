"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // We'll implement the search functionality later
    console.log("Searching for:", search);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
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
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>
    </header>
  );
} 