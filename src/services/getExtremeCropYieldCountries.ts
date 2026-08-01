import type { commonProps } from "./cropAnalysis";

export const getRankedCropYieldCountries = (combinedData: commonProps[]) => {
    if (!combinedData || combinedData.length === 0) return [];

    const countryMap = combinedData.reduce((acc, curr) => {
        const country = curr['Pacific Island Countries and territories'];
        const val = curr.cropValue;
        
        if (country && val !== undefined) {
            if (!acc[country]) {
                acc[country] = { total: 0, count: 0 };
            }
            acc[country].total += val;
            acc[country].count += 1;
        }
        return acc;
    }, {} as Record<string, { total: number; count: number }>);

    // Map into an array and compute average yield
    const countryAverages = Object.entries(countryMap).map(([country, data]) => ({
        country,
        avgValue: data.total / data.count
    }));

    // Sort ascending: Index [0] is the most reduced (lowest), 
    // and the last index is the least reduced (highest)
    return countryAverages.sort((a, b) => a.avgValue - b.avgValue);
};