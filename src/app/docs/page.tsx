import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Weather App Documentation</h1>
      
      {/* Tech Stack Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Next.js 15.3.0</strong> - React framework for production
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li>App Router for improved routing and layouts</li>
                <li>Server Components for better performance</li>
                <li>API Routes for backend functionality</li>
              </ul>
            </li>
            <li>
              <strong>React 19</strong> - UI library
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li>Hooks for state management</li>
                <li>Server Components support</li>
              </ul>
            </li>
            <li>
              <strong>TypeScript</strong> - Type safety and better developer experience
            </li>
            <li>
              <strong>TailwindCSS</strong> - Utility-first CSS framework
            </li>
            <li>
              <strong>shadcn/ui</strong> - Reusable component library
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li>Customizable components</li>
                <li>Built on Radix UI primitives</li>
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Project Structure Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Project Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
{`weatherapp-next/
├── src/
│   ├── app/
│   │   ├── docs/
│   │   │   └── page.tsx      # Documentation page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── Header.tsx        # App header with search
│   │   ├── WeatherCard.tsx   # Weather display component
│   │   └── ui/               # shadcn components
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── package.json             # Dependencies
└── tsconfig.json           # TypeScript configuration`}
          </pre>
        </CardContent>
      </Card>

      {/* Components Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Key Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Header Component</h3>
              <p className="mb-2">The header component contains:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>App title</li>
                <li>Search functionality for cities</li>
                <li>Responsive design for mobile and desktop</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">WeatherCard Component</h3>
              <p className="mb-2">Displays weather information including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Current temperature</li>
                <li>Humidity levels</li>
                <li>Wind speed</li>
                <li>Feels like temperature</li>
                <li>Atmospheric pressure</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Data Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>The application follows this data flow:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>User enters a city name in the search bar</li>
              <li>Search form prevents default form submission</li>
              <li>Weather API call will be made (to be implemented)</li>
              <li>Data will be fetched and transformed</li>
              <li>UI updates with new weather information</li>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              Note: Weather API integration is pending implementation
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Development Section */}
      <Card>
        <CardHeader>
          <CardTitle>Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Running the Project</h3>
            <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
{`# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start`}
            </pre>
            <p className="text-sm text-muted-foreground mt-4">
              Access the development server at http://127.0.0.1:3000
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 