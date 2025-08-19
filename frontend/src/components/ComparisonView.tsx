import React from 'react';

export interface ComparisonReport {
  title: string;
  summary: string;
  vehicles: {
    name: string;
    specs: Record<string, string>;
    pros: string[];
    cons: string[];
  }[];
}

const ComparisonView: React.FC<{ report: ComparisonReport }> = ({ report }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{report.title}</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">{report.summary}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {report.vehicles.map((vehicle, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">{vehicle.name}</h3>
            <div className="mb-4">
              <h4 className="font-bold text-md mb-2 text-gray-800 dark:text-gray-200">Specifications</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                {Object.entries(vehicle.specs).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-bold text-md mb-2 text-green-600 dark:text-green-400">Pros</h4>
              <ul className="list-disc list-inside text-green-700 dark:text-green-300">
                {vehicle.pros.map((pro, i) => <li key={i}>{pro}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-md mb-2 text-red-600 dark:text-red-400">Cons</h4>
              <ul className="list-disc list-inside text-red-700 dark:text-red-300">
                {vehicle.cons.map((con, i) => <li key={i}>{con}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonView;
