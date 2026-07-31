
import tempData from '../../public/data/surface-temperature-anomalies.json'
import cropData from '../../public/data/Crop_Yields.json'

import { useEffect, useState } from 'react'
import { calculateCorrelation } from '../utils/calculateCorrelation'

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

            //1. clean data
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
                d['Pacific Island Countries and territories'] === selectCountry
            )

             const groupCleanCrop = cropData.filter(d => 
                Number(d.OBS_VALUE) && 
                Number(d.TIME_PERIOD) && 
                d.OBS_VALUE !== null && 
                d.TIME_PERIOD !== null && 
                d.OBS_VALUE !== undefined &&
                d.TIME_PERIOD !== undefined &&
                d['Pacific Island Countries and territories']
            )

            const uniqueCountries = [...new Set(cropData.map(d => d['Pacific Island Countries and territories']))]
            setCountryList(uniqueCountries)

            const tempMap = new Map()
            cleanTemp.forEach(d => {
                tempMap.set(d.TIME_PERIOD,d)
            })

            const combineData = [] as commonProps[]
        
            cleanCrop.forEach(d => {

                const timePeriod = d.TIME_PERIOD
        
                if(tempMap.has(timePeriod)){

                    const temp = tempMap.get(timePeriod)
        
                    combineData.push({
                        year: timePeriod,
                        tempValue: Number(temp.OBS_VALUE),
                        cropValue: Number(d.OBS_VALUE),
                        country: d['Pacific Island Countries and territories'],
                    })
                }
            })

            setCropYield(combineData)

            const groupData = [] as commonProps[]

            groupCleanCrop.forEach(d => {

                const timePeriod = d.TIME_PERIOD

                if(tempMap.has(timePeriod)){

                    const temp = tempMap.get(timePeriod)

                    groupData.push({
                        year: timePeriod,
                        tempValue: Number(temp.OBS_VALUE),
                        cropValue: Number(d.OBS_VALUE),
                        country: d['Pacific Island Countries and territories'],
                    })
                }
            })

            //calculate correlation
            const temps = groupData.map(d => d.tempValue as number)
            const cropsValue = groupData.map(d => d.cropValue as number)

            const correlationData = groupData.reduce((acc,value) => {

                if(!acc[value.country!]){
                    acc[value.country!] = {}
                }

                if(!acc[value.country!][value.year!]){
                    acc[value.country!][value.year!] = []
                }

                
                acc[value.country!][value.year!].push(value)

                return acc

            },{} as Record<string, Record<number, commonProps[]>>)

            const countryCorrelations: Record<string, number> = {}

            for (const country in correlationData) {
            const countryTemps: number[] = [];
            const countryCrops: number[] = [];

            // Loop through each year object stored for the country
            for (const year in correlationData[country]) {
                    // Since each year can hold multiple records (e.g., different crops/types),
                    // loop through them to gather all data points
                    correlationData[country][year].forEach(record => {
                        if (record.tempValue !== undefined && record.cropValue !== undefined) {
                            countryTemps.push(record.tempValue);
                            countryCrops.push(record.cropValue);
                        }
                    });
                }

                // Calculate correlation for this specific country
                const corr = calculateCorrelation(countryTemps, countryCrops);
                countryCorrelations[country] = corr;

                // Map the result back into your data or attach it to an object/state
                // Example: If you want to store it back right into the country's node:
                // (correlationData[country] as any).correlation = corr;
            }

            console.log('Per-Country Correlations:', countryCorrelations);

            console.log('correlationData:', correlationData)

            const correlation = calculateCorrelation(temps,cropsValue)
            console.log('CORRELATION:', correlation)

        }    

        //which country is showing the highest temp

        getData()

        
    },[selectCountry])
    
    return {cropYield, countryList, selectCountry, setSelectCountry}

}




