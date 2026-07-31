
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
                d['Pacific Island Countries and territories']
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

            //extract countries
            const uniqueCountries = [...new Set(cropData.map(d => d['Pacific Island Countries and territories']))]
            setCountryList(uniqueCountries)

            //combine temp & crop
            const combineData = [] as commonProps[]

            const tempMap = new Map()
            cleanTemp.forEach(d => {
                tempMap.set(d.TIME_PERIOD,d)
            })
        
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

            console.log('COMBINE DATA:' , combineData)

            //group by countries
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
            const groupByCountry = groupData.reduce((acc,value) => {

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

            for (const country in groupByCountry) {
            const countryTemps: number[] = [];
            const countryCrops: number[] = [];

            // Loop through each year object stored for the country
            for (const year in groupByCountry[country]) {
                    // Since each year can hold multiple records (e.g., different crops/types),
                    // loop through them to gather all data points
                    groupByCountry[country][year].forEach(record => {
                        if (record.tempValue !== undefined && record.cropValue !== undefined) {
                            countryTemps.push(record.tempValue);
                            countryCrops.push(record.cropValue);
                        }
                    });
                }

                // Calculate correlation for this specific country
                const correlationData = calculateCorrelation(countryTemps, countryCrops);
                countryCorrelations[country] = correlationData;

                // Map the result back into your data or attach it to an object/state
                // Example: If you want to store it back right into the country's node:
                // (groupByCountry[country] as any).correlation = corr;
            }

            console.log('Per-Country Correlations:', countryCorrelations);
            console.log('groupByCountry:', groupByCountry)

        }    

        //which country is showing the highest temp

        getData()

        
    },[selectCountry])
    
    return {cropYield, countryList, selectCountry, setSelectCountry}

}




