import React from 'react';

export interface Ad {
  vehicle_name: string;
  title: string;
  price: string;
  year: number;
  mileage_km: number;
  location: string;
  url: string;
}

const AdCard: React.FC<{ ad: Ad }> = ({ ad }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{ad.title}</h3>
      <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 my-2">{ad.price}</p>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        <p><span className="font-semibold">Year:</span> {ad.year}</p>
        <p><span className="font-semibold">Mileage:</span> {ad.mileage_km.toLocaleString()} km</p>
        <p><span className="font-semibold">Location:</span> {ad.location}</p>
      </div>
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        View Original Ad
      </a>
    </div>
  );
};

export default AdCard;
