import { useState } from 'react';
import tempData from '../../public/data/surface-temperature-anomalies.json';
import * as ss from 'simple-statistics'
import type { DataPoint } from '../types';

export const useTemperature = (externalSelectedCountries?: string[]) => {

    const [internalSelected, setInternalSelected] = useState<string[]>(['Papua New Guinea','French Polynesia','Tokelau','Pitcairn']);

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
        d.TIME_PERIOD % 15 === 0 
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

    const lineData = Object.keys(groupByCountry).map(country => ({
        countryName: country
    }));

    const countryList = Array.from(new Set(tempData.map(d => d['Pacific Island Countries and territories']))).filter(Boolean) as string[];

    //temp analysis
    const tempAnalysis = []

    for(const [country,records] of Object.entries(groupByCountry)){

        const linear = records.map(d => [d.year,d.value])

        const slope = ss.linearRegression(linear)

        tempAnalysis.push({
            country,
            trend:slope.m
        })

    }

     const dataSlope = tempData.filter(d => 
            d.TIME_PERIOD !== null &&
            d.TIME_PERIOD !== undefined &&
            d.OBS_VALUE !== undefined &&
            d.OBS_VALUE !== null &&
            d.TIME_PERIOD % 20
        )
        .sort((a,b) => a.TIME_PERIOD - b.TIME_PERIOD)
        .reduce<Record<string,DataPoint[]>>((acc,value) => {
    
            const country = value['Pacific Island Countries and territories']
    
            if(!acc[country]){
                acc[country] = []
            }
    
            acc[country].push({country,value:value.OBS_VALUE,year:value.TIME_PERIOD})
    
            return acc
    
        },{})

    const data = Object.entries(dataSlope).map(([country, records]) => {
    
            const mData = records.map(d => [d.year,d.value])
    
            const shapeData = {country,mData}
    
            return shapeData
    
        })
     
    //which country is showing the most/least crop decline(slope)
    const slope = data.map(d => {
        const slope = ss.linearRegression(d.mData)
        const lineFunction = ss.linearRegressionLine(slope)
        const predictYear = lineFunction(2025)
        return {country:d.country,slope:slope.m,lineFunction,predictYear}
    })

    return { countryList, chartData, tempdata:data, slope, lineData, selectedCountries, setSelectedCountries };   

};