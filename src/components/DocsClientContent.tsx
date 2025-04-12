'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamically import the MermaidDiagram component, disabling SSR
const MermaidDiagram = dynamic(() => import('@/components/MermaidDiagram'), {
  ssr: false, // This is the key part
  loading: () => <p>Loading diagram...</p>, // Optional loading state
});

export default function DocsClientContent() {
  // Define the Mermaid diagram string
  const dataFlowDiagram = `
graph TD
    subgraph "Search by City"
        A[User enters city in Header Search Bar] --> B{onSearch triggers handleSearch in Page};
        B --> C[Call getWeatherByCity service];
        C -- WeatherData --> D[Display WeatherCard];
        C -- Error --> E[Display Error Message];
    end

    subgraph "Use My Location"
        F[User clicks 'Use My Location' Button] --> G{handleGetLocation in Page};
        G --> H{Browser asks for permission};
        H -- Permission Granted --> I[navigator.geolocation gets coordinates];
        I --> J[Call getWeatherByCoords service];
        J -- WeatherData --> K[Display WeatherCard];
        J -- Error --> L[Display Error Message];
        H -- Permission Denied --> M[Display Permission Error];
    end
`;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Data Flow Diagram</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>The application supports two primary ways to fetch weather data:</p>
          <MermaidDiagram chart={dataFlowDiagram} />
          <p className="mt-4 text-sm text-muted-foreground">
            This diagram illustrates the sequence of events for both searching by city and using the current location.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 