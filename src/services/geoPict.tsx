import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import csvUrl from '/data/surface-temperature-anomalies.csv?url';

interface tempInterface {
  GEO_PICT: string;
  'Pacific Island Countries and territories'?: string;
}

interface GeoItem {
  code: string;
  name: string;
}

export default function GeoPictList() {
  const [geoPicts, setGeoPicts] = useState<GeoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: { data: tempInterface[] }) => {
            const map = new Map<string, string>();
            results.data.forEach((row) => {
              if (row.GEO_PICT) {
                map.set(
                  row.GEO_PICT,
                  row['Pacific Island Countries and territories'] || row.GEO_PICT
                );
              }
            });

            const uniqueList: GeoItem[] = Array.from(map, ([code, name]) => ({
              code,
              name,
            }));
            setGeoPicts(uniqueList);
            setLoading(false);
          },
        });
      });
  }, []);

  if (loading) return <div className="p-6">Loading GEO_PICT list...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Unique GEO_PICT List ({geoPicts.length})</h2>
      <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {geoPicts.map((item) => {
          // Convert code to lowercase for standard flag URL formats (e.g., 'fj' -> Fiji)
          const countryCode = item.code.toLowerCase();

          return (
            <li key={item.code} className="py-2 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Crisp SVG Flag Image */}
                <img
                  src={`https://flagcdn.com/w40/${countryCode}.png`}
                  srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
                  width="30"
                  height="22"
                  alt={`${item.name} flag`}
                  className="rounded shadow-sm object-cover"
                />
                <span className="font-semibold text-blue-600">{item.code}</span>
              </div>
              <span className="text-gray-700">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}