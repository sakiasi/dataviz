
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
}

export const useCropAnalysis=()=>{

    const [selectCountry, setSelectCountry] = useState(null)
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
                    const cropValue = tempMap.get(timePeriod)
        
                    combineData.push({
                        year: timePeriod,
                        tempValue: Number(d.OBS_VALUE),
                        cropValue: Number(cropValue.OBS_VALUE),
                        country: d['Pacific Island Countries and territories']
                    })
                }
            })
        
            setCropYield(combineData)
        }

        //what is the correlation between temp and crop yield in all countries ?

        //which country is showing strong correlation ?

        //which countries has the most reduction ?

        getData()

    },[selectCountry])

    return {cropYield, countryList, selectCountry, setSelectCountry}

}




