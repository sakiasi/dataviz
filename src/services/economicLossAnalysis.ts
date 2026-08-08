import { useState, useMemo } from 'react'
import seaData from '../../public/data/EconomicLoss.json'
import * as ss from 'simple-statistics'

export interface SeaInterface {
    value: number,
    year: number,
    country: string,
}

// Helper function to safely parse currency strings like " $268,950.00 " into numbers
const parseObsValue = (val: any): number | null => {
    if (val === null || val === undefined) return null;
    if (typeof val === 'number') return val;
    // Remove $, commas, and whitespace, then parse as float
    const cleaned = String(val).replace(/[\$,\s]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
};

export const useEconomicLossAnalysis = (externalSelectedCountries?: string[]) => {
    
    const [internalSelected, setInternalSelected] = useState<string[]>([
        'Fiji',
        'Vanuatu',
        'Marshall Islands',
        'Kiribati',
        'Samoa',
        'French Polynesia',
        'New Caledonia',
        'Micronesia (Federated States of)'
    ]);
    
    const selectedCountries = externalSelectedCountries ?? internalSelected;
    const setSelectedCountries = setInternalSelected;

    const countryList = useMemo(() => {
        return Array.from(new Set(seaData.map((d: any) => d['Pacific Island Countries and territories'])));
    }, []);

    const { chartData, lineData, slope } = useMemo(() => {
        // 1. Clean and normalize data for charts
        const cleanData = seaData.filter((d: any) => {
            const val = parseObsValue(d['OBS_VALUE ']);
            return (
                d.TIME_PERIOD !== null &&
                d.TIME_PERIOD !== undefined &&
                val !== null &&
                (selectedCountries.length === 0 || selectedCountries.includes(d['Pacific Island Countries and territories'])) 
                // d.TIME_PERIOD % 10 === 0
            );
        }).sort((a: any, b: any) => a.TIME_PERIOD - b.TIME_PERIOD);

        const groupByCountry = cleanData.reduce<Record<string, SeaInterface[]>>((acc, value: any) => {
            const country = value['Pacific Island Countries and territories'];
            const val = parseObsValue(value['OBS_VALUE ']);

            if (!acc[country]) {
                acc[country] = [];
            }
            if (val !== null) {
                acc[country].push({ country, value: val, year: value.TIME_PERIOD });
            }
            return acc;
        }, {});

        const cData = Array.from(new Set(cleanData.map((d: any) => d.TIME_PERIOD)))
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

        // 2. Process data for slope/regression calculations
        const dataSlope = seaData.filter((d: any) => {
            const val = parseObsValue(d['OBS_VALUE ']);
            return (
                d.TIME_PERIOD !== null &&
                d.TIME_PERIOD !== undefined &&
                val !== null &&
                d.TIME_PERIOD % 20
            );
        })
        .sort((a: any, b: any) => a.TIME_PERIOD - b.TIME_PERIOD)
        .reduce<Record<string, SeaInterface[]>>((acc, value: any) => {
            const country = value['Pacific Island Countries and territories'];
            const val = parseObsValue(value['OBS_VALUE ']);

            if (!acc[country]) {
                acc[country] = [];
            }
            if (val !== null) {
                acc[country].push({ country, value: val, year: value.TIME_PERIOD });
            }
            return acc;
        }, {});

        const data = Object.entries(dataSlope).map(([country, records]) => {
            const mData = records.map(d => [d.year, d.value]);
            return { country, mData };
        });

        const slp = data.map(d => {
            // simple-statistics requires at least 2 points to run regression
            if (d.mData.length < 2) {
                return { country: d.country, slope: 0, lineFunction: () => 0, predictYear: 0 };
            }
            const regression = ss.linearRegression(d.mData);
            const lineFunction = ss.linearRegressionLine(regression);
            const predictYear = lineFunction(2025);
            return { country: d.country, slope: regression.m, lineFunction, predictYear };
        });

        return { chartData: cData, lineData: lData, slope: slp };
    }, [selectedCountries]);

    return { selectedCountries, setSelectedCountries, countryList, chartData, lineData, slope };
}

