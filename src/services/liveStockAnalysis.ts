import { useState, useMemo } from 'react'
import seaData from '../../public/data/Livestock Yield.json'
import * as ss from 'simple-statistics'

export interface SeaInterface {
    value: number,
    year: number,
    country: string,
}

export const useLivestockAnalysis = (externalSelectedCountries?: string[]) => {
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
        return Array.from(new Set(seaData.map(d => d['Pacific Island Countries and territories'])));
    }, []);

    // 2. Memoize cleanData and groupByCountry to prevent 25k row recalculations on every render
    const { chartData, lineData } = useMemo(() => {
        const cleanData = seaData.filter(d => 
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

    // 3. Memoize regression/slope calculation
    const slope = useMemo(() => {
        const dataSlope = seaData.filter(d => 
            d.TIME_PERIOD != null &&
            d.OBS_VALUE != null &&
            d.TIME_PERIOD % 20
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
        });
    }, []);


    return { selectedCountries, setSelectedCountries, countryList, chartData, lineData, slope };
}