import { useState, useMemo } from 'react'
import land from '../../public/data/Climate Altering Land Cover Index.json'
import tempData from '../../public/data/surface-temperature-anomalies.json'
import * as ss from 'simple-statistics'

export interface SeaInterface {
    value: number,
    year: number,
    country: string,
}

export const useLandAnalysis = (externalSelectedCountries?: string[]) => {
    const [internalSelected, setInternalSelected] = useState<string[]>([
        'Papua New Guinea', 
        'Solomon Islands', 
        'Tokelau', 
        'Northern Mariana Islands'
    ]);
    
    const selectedCountries = externalSelectedCountries ?? internalSelected;
    const setSelectedCountries = setInternalSelected;

    // 1. Memoize country list so it only computes once
    const countryList = useMemo(() => {
        return Array.from(new Set(land.map(d => d['Pacific Island Countries and territories'])));
    }, []);

    // 2. Memoize cleanData and groupByCountry to prevent 25k row recalculations on every render
    const { chartData, lineData } = useMemo(() => {
        const cleanData = land.filter(d => 
            d.TIME_PERIOD != null &&
            d.OBS_VALUE != null &&
            (selectedCountries.length === 0 || selectedCountries.includes(d['Pacific Island Countries and territories'])) &&
            d.TIME_PERIOD % 3 === 0
        ).sort((a, b) => a.TIME_PERIOD - b.TIME_PERIOD);

        const groupByCountry = cleanData.reduce<Record<string, SeaInterface[]>>((acc, value) => {
            const country = value['Pacific Island Countries and territories'];
            if (!acc[country]) {
                acc[country] = [];
            }
            acc[country].push({ country, value: value.OBS_VALUE, year: value.TIME_PERIOD });
            return acc;
        }, {});

        const cData = Array.from(new Set(cleanData.map(d => d.TIME_PERIOD)))
            .map(year => {
                const row: Record<string, number> = { year };
                Object.entries(groupByCountry).forEach(([country, records]) => {
                    const found = records.find(d => d.year === year);
                    if (found) {
                        row[country] = found.value;
                    }
                });
                return row;
            });

        const lData = Object.keys(groupByCountry).map(d => ({ countryName: d }));

        return { chartData: cData, lineData: lData };
    }, [selectedCountries]);

    // 3. Memoize regression/slope calculation (over time)
    const slope = useMemo(() => {
        const dataSlope = land.filter(d => 
            d.TIME_PERIOD != null &&
            d.OBS_VALUE != null
        )
        .sort((a, b) => a.TIME_PERIOD - b.TIME_PERIOD)
        .reduce<Record<string, SeaInterface[]>>((acc, value) => {
            const country = value['Pacific Island Countries and territories'];
            if (!acc[country]) {
                acc[country] = [];
            }
            acc[country].push({ country, value: value.OBS_VALUE, year: value.TIME_PERIOD });
            return acc;
        }, {});

        const data = Object.entries(dataSlope).map(([country, records]) => {
            const mData = records.map(d => [d.year, d.value]);
            return { country, mData };
        });

        return data.map(d => {
            const slp = ss.linearRegression(d.mData);
            const lineFunction = ss.linearRegressionLine(slp);
            const predictYear = lineFunction(2025);
            return { country: d.country, slope: slp.m, lineFunction, predictYear };
        }).sort((a,b) => b.slope - a.slope)
    }, []);

     //correlation
        const tempLookup = useMemo(() => {
            const map = new Map<string, number>();
            tempData.forEach(d => {
                const country = d['Pacific Island Countries and territories']
                const year = d.TIME_PERIOD
                const value = d.OBS_VALUE
    
                if (country && year !== undefined && value !== undefined && value !== null) {
                    // Compound key format: "CountryName-Year"
                    map.set(`${country}-${year}`, value);
                }
            });
            return map;
        }, []);
    
        const { countryInfluence } = useMemo(() => {

            const countryGroups: Record<string, { xTemp: number[]; yLand: number[]; pairs: [number, number][] }> = {};
            const yearlyRows: Record<number, Record<string, { land: number; temp: number }>> = {};
    
            land.forEach(land => {
                const country = land['Pacific Island Countries and territories'];
                const year = land.TIME_PERIOD;
                const landValue = land.OBS_VALUE;
    
                if (!country || year === undefined || landValue === undefined || landValue === null) return;
    
                // Generate matching key for the temperature dictionary
                const key = `${country}-${year}`;

                if (tempLookup.has(key)) {

                    const tempValue = tempLookup.get(key)!;
    
                    // Group for statistical calculation
                    if (!countryGroups[country]) {
                        countryGroups[country] = { xTemp: [], yLand: [], pairs: [] };
                    }
                    countryGroups[country].xTemp.push(tempValue);
                    countryGroups[country].yLand.push(landValue);
                    countryGroups[country].pairs.push([tempValue, landValue]); // [X, Y] for regression
    
                    // Group for chronological UI charting options
                    if (!yearlyRows[year]) yearlyRows[year] = {};
                    yearlyRows[year][country] = { land: landValue, temp: tempValue };
                }
            });
    
            // Format chronological timeline chart data for components like Recharts
            const formattedChartData = Object.entries(yearlyRows)
                .map(([yearStr, countries]) => {
                    const row: Record<string, any> = { year: Number(yearStr) };
                    Object.entries(countries).forEach(([cName, vals]) => {
                        row[`${cName}_monitor`] = vals.land;
                        row[`${cName}_temp`] = vals.temp;
                    });
                    return row;
                })
                .sort((a, b) => a.year - b.year);
    
            // STEP 4: Run cross-dataset statistics (Air Temp vs Ocean Temp)
            const influenceAnalysis = Object.entries(countryGroups)
                .filter(([_, data]) => data.pairs.length > 1) // Simple statistics requires at least 2 points
                .map(([country, data]) => {
                    const regression = ss.linearRegression(data.pairs);
                    const rValue = ss.sampleCorrelation(data.xTemp, data.yLand);
                    const rSquared = Math.pow(rValue, 2);
    
                    return {
                        country,
                        dataPointsCount: data.pairs.length,
                        slope: regression.m,          // land value decreases per 1°C air increase
                        intercept: regression.b,      // Theoretical baseline land value
                        correlation: rValue,          // r value (-1 to +1)
                        rSquared: rSquared            // R² value (0 to 1): percentage of variation explained
                    };
                });
    
            return { tempLandChartData: formattedChartData, countryInfluence: influenceAnalysis };

        }, [tempLookup]);
    
        // Filtered lists matching current selections for your frontend view
        const filteredInfluence = useMemo(() => {
            return countryInfluence.filter(d => selectedCountries.length === 0 || selectedCountries.includes(d.country));
        }, [countryInfluence, selectedCountries]);

    return {selectedCountries, setSelectedCountries, countryInfluence, countryList, chartData, lineData, slope,  influenceAnalysis: filteredInfluence }

}