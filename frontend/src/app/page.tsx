"use client";

import { useState } from "react";
import AdCard, { Ad } from "@/components/AdCard";
import ComparisonView, { ComparisonReport } from "@/components/ComparisonView";

interface ApiResponse {
  expert_comparison: ComparisonReport;
  local_market_ads: Ad[];
}

export default function Home() {
  const [vehicle1, setVehicle1] = useState("");
  const [vehicle2, setVehicle2] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle1 || !vehicle2) {
      setError("Please enter two vehicle models to compare.");
      return;
    }
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("http://localhost:8000/api/v1/analyze-vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicle1, vehicle2 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setResults(data);

    } catch (err) {
      setError("Failed to fetch comparison data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 bg-gray-50 dark:bg-black">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl md:text-4xl font-bold text-center w-full text-gray-800 dark:text-white">
          AI-Powered Vehicle Analyst
        </h1>
      </div>

      <div className="w-full max-w-5xl mt-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={vehicle1}
              onChange={(e) => setVehicle1(e.target.value)}
              placeholder="e.g., Toyota Vitz"
              className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              value={vehicle2}
              onChange={(e) => setVehicle2(e.target.value)}
              placeholder="e.g., Suzuki Swift"
              className="p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Analyzing..." : "Compare Vehicles"}
          </button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>

      {loading && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">The AI agents are at work... Please wait.</p>
        </div>
      )}

      {results && (
        <div className="mt-8 w-full max-w-5xl">
          <div className="mb-8">
            <ComparisonView report={results.expert_comparison} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Local Market Ads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.local_market_ads.map((ad, index) => (
                <AdCard key={index} ad={ad} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
