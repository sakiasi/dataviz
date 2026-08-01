
import tempData from '../../public/data/surface-temperature-anomalies.json'
import cropData from '../../public/data/Crop_Yields.json'
import { sampleCorrelation } from 'simple-statistics'
import { useState, useMemo } from 'react'

export interface commonProps {
    TIME_PERIOD?: number
    OBS_VALUE?: number
    ['Agricultural product']?: string
    ['Pacific Island Countries and territories']?: string
    AGRICULTURE_PRODUCTION_TYPE?: string
    country?: string
    year?: number
    cropDisValue?: number
    tempValue?: number
    cropValue?: number
    correlation?: number
}

export const useCropAnalysis = () => {

    const [selectCountry, setSelectCountry] = useState<string>('Fiji')

    // 1. Process and combine all data once, memoized for performance
    const { combinedData, countryList, countryCorrelations } = useMemo(() => {
        // Clean temperature data
        const cleanTemp = tempData.filter(d => 
            Number(d.OBS_VALUE) && 
            Number(d.TIME_PERIOD) &&
            d.OBS_VALUE !== null &&
            d.TIME_PERIOD !== null &&
            d.OBS_VALUE !== undefined &&
            d.TIME_PERIOD !== undefined &&
            d['Pacific Island Countries and territories']
        );
    
        // Clean crop data
        const cleanCrop = cropData.filter(d => 
            Number(d.OBS_VALUE) && 
            Number(d.TIME_PERIOD) && 
            d.OBS_VALUE !== null && 
            d.TIME_PERIOD !== null && 
            d.OBS_VALUE !== undefined &&
            d.TIME_PERIOD !== undefined &&
            d['Pacific Island Countries and territories']
        );

        // Index temperature data for O(1) lookups
        const tempMap = new Map<string, number>();
        cleanTemp.forEach(item => {
            const countryKey = item['Pacific Island Countries and territories']?.trim().toLowerCase();
            const yearKey = item.TIME_PERIOD;
            const key = `${countryKey}-${yearKey}`;
            tempMap.set(key, Number(item.OBS_VALUE));
        });

        // Combine data and filter out missing pairs
        const combined: commonProps[] = cleanCrop
            .map(crop => {
                const countryKey = crop['Pacific Island Countries and territories']?.trim().toLowerCase();
                const yearKey = crop.TIME_PERIOD;
                const lookupKey = `${countryKey}-${yearKey}`;
                const tempValue = tempMap.get(lookupKey);

                return {
                    ...crop,
                    cropValue: Number(crop.OBS_VALUE),
                    tempValue: tempValue,
                };
            })
            .filter(d => d.tempValue !== undefined && d.tempValue !== null && d.cropValue !== undefined && !isNaN(d.tempValue));

        // Extract unique countries
        const uniqueCountries = Array.from(
            new Set(cleanCrop.map(d => d['Pacific Island Countries and territories']).filter(Boolean))
        ) as string[];

        // Group by country to calculate correlations
        const groupByCountry = combined.reduce((acc, value) => {
            const country = value['Pacific Island Countries and territories'];
            if (country) {
                if (!acc[country]) acc[country] = [];
                acc[country].push(value);
            }
            return acc;
        }, {} as Record<string, commonProps[]>);

        const correlations: Record<string, number> = {};
        Object.keys(groupByCountry).forEach(country => {
            const countryRows = groupByCountry[country];
            const x: number[] = [];
            const y: number[] = [];

            countryRows.forEach(row => {
                if (row.tempValue !== undefined && row.cropValue !== undefined) {
                    x.push(row.tempValue);
                    y.push(row.cropValue);
                }
            });

            if (x.length > 1 && y.length > 1) {
                try {
                    correlations[country] = sampleCorrelation(x, y);
                } catch (error) {
                    console.error(`Could not calculate correlation for ${country}:`, error);
                }
            }
        });

        return {
            combinedData: combined,
            countryList: uniqueCountries,
            countryCorrelations: correlations
        };
    }, []); // Runs once on mount since raw data comes from static JSON imports

    // 2. Filter data derived specifically for the selected country view
    const cropYield = useMemo(() => {
        return combinedData.filter(
            d => d['Pacific Island Countries and territories'] === selectCountry
        );
    }, [combinedData, selectCountry]);

    console.log('CORRELATION:', countryCorrelations)

    return { cropYield,
        countryList,
        selectCountry,
        setSelectCountry,
        countryCorrelations,
    };

};


