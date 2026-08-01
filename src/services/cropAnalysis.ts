
import tempData from '../../public/data/surface-temperature-anomalies.json'
import cropData from '../../public/data/Crop_Yields.json'

import { useEffect, useState } from 'react'

interface commonProps{
    TIME_PERIOD ?: number,
    OBS_VALUE ?: number,
    ['Agricultural product'] ?: string,
    ['Pacific Island Countries and territories'] ?: string,
    AGRICULTURE_PRODUCTION_TYPE ?: string,
    country ?: string,
    year ?: number,
    cropDisValue ?: number,
    tempValue ?: number,
    cropValue ?: number,
    correlation ?: number
}

export const useCropAnalysis=()=>{

    const [selectCountry, setSelectCountry] = useState<string>('Fiji')
    const [cropYield, setCropYield] = useState<commonProps[]>([])
    const [countryList, setCountryList] = useState<string[]>([])

    useEffect(()=>{

        const getData=()=>{

            // 1. Clean data (keeping your logic)
            const cleanTemp = tempData.filter(d => 
                Number(d.OBS_VALUE) && 
                Number(d.TIME_PERIOD) &&
                d.OBS_VALUE !== null &&
                d.TIME_PERIOD !== null &&
                d.OBS_VALUE !== undefined &&
                d.TIME_PERIOD !== undefined
        
            )

            const cleanCrop = cropData.filter(d => 
                Number(d.OBS_VALUE) && 
                Number(d.TIME_PERIOD) && 
                d.OBS_VALUE !== null && 
                d.TIME_PERIOD !== null && 
                d.OBS_VALUE !== undefined &&
                d.TIME_PERIOD !== undefined &&
                d['Pacific Island Countries and territories']
            )

            // 2. Index temperature data by a unique key (e.g., country + year)
            const tempMap = new Map<string, number>();
            cleanTemp.forEach(item => {
                const countryKey = item['Pacific Island Countries and territories']?.trim().toLowerCase();
                const yearKey = item.TIME_PERIOD;
                const key = `${countryKey}-${yearKey}`;
                tempMap.set(key, Number(item.OBS_VALUE));
            });

            // 3. Combine data efficiently
            const combinedData: commonProps[] = cleanCrop.map(crop => {
                const countryKey = crop['Pacific Island Countries and territories']?.trim().toLowerCase();
                const yearKey = crop.TIME_PERIOD;
                const lookupKey = `${countryKey}-${yearKey}`;

                const tempValue = tempMap.get(lookupKey);

                return {
                    ...crop,
                    cropValue: Number(crop.OBS_VALUE),
                    tempValue: tempValue !== undefined ? tempValue : undefined,
                };
            });

            // 4. Filter for the selected country and update state
            const filteredByCountry = combinedData.filter(
                d => d['Pacific Island Countries and territories'] === selectCountry
            );

            setCropYield(filteredByCountry);

            // 5. Extract unique country list for UI dropdowns
            const uniqueCountries = Array.from(
                new Set(cleanCrop.map(d => d['Pacific Island Countries and territories']).filter(Boolean))
            ) as string[];
            setCountryList(uniqueCountries);

        }    

        //which country is showing the highest temp

        getData()
        
    },[selectCountry])
    
    return {cropYield, countryList, selectCountry, setSelectCountry}

}




