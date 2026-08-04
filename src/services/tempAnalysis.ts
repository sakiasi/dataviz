import { useState } from 'react';
import tempData from '../../public/data/surface-temperature-anomalies.json';

interface DataPoint {
    year: number;
    value: number;
}

export const useTemperature = (externalSelectedCountries?: string[]) => {
    const [internalSelected, setInternalSelected] = useState<string[]>(['Fiji']);

    // Use external state if passed from parent, otherwise fallback to internal
    const selectedCountries = externalSelectedCountries ?? internalSelected;
    const setSelectedCountries = setInternalSelected;

    // Clean data dynamically based on conditions
    const cleanData = tempData.filter(d => 
        d.TIME_PERIOD !== undefined &&
        d.TIME_PERIOD !== null &&
        d.OBS_VALUE !== undefined &&
        d.OBS_VALUE !== null &&
        (selectedCountries.length === 0 || selectedCountries.includes(d['Pacific Island Countries and territories'])) &&
        d.TIME_PERIOD % 15 === 0 &&
        d.TIME_PERIOD
    );

    const allYears = Array.from(new Set(cleanData.
        map(d => Number(d.TIME_PERIOD))))
        .sort((a, b) => a - b)

    const groupByCountry = cleanData.reduce<Record<string, DataPoint[]>>((acc, value) => {

        const country = value['Pacific Island Countries and territories'];
        if (!country) return acc;

        if (!acc[country]) {
            acc[country] = [];
        }

        acc[country].push({ 
            year: Number(value.TIME_PERIOD),
            value: Number(value.OBS_VALUE)
        });

        return acc;

    }, {});

    Object.keys(groupByCountry).forEach(country => {
        groupByCountry[country].sort((a, b) => a.year - b.year);
    });

    const chartData = allYears.map(year => {
        const row: Record<string, any> = { year };
        Object.entries(groupByCountry).forEach(([country, records]) => {
            const found = records.find(r => r.year === year);
            if (found) {
                row[country] = found.value;
            }
        });
        return row;
    });

    

    console.log('CHART DATA:', chartData)    

    const lineData = Object.keys(groupByCountry).map(country => ({
        countryName: country
    }));

    console.log('LINE DATA:', lineData)

    const countryList = Array.from(new Set(tempData.map(d => d['Pacific Island Countries and territories']))).filter(Boolean) as string[];

    return { countryList, chartData, lineData, selectedCountries, setSelectedCountries };
};