
import tempData from '../../public/data/surface-temperature-anomalies.json'
import jsonUrl from '../../public/data/Crop_Yields_Disaggregated.json?url';


import { useEffect, useState } from 'react'

interface commonProps{
    TIME_PERIOD ?: number,
    OBS_VALUE ?: number,
    ['Agricultural product'] ?: string,
    ['Pacific Island Countries and territories'] ?: string,
    AGRICULTURE_PRODUCTION_TYPE ?: string,
    country ?: string,
    year ?: number,
    cropDisValue ?: number
}

    //does crop yield decline in all countries ?
    //which crop has the most reduction in yield and in which country ?


export const useCropDisAnalysis=()=>{

    const [selectCountry, setSelectCountry] = useState(null)
    const [cropDisaggregated, setCropDisaggregated] = useState<commonProps[]>([])

    //1. clean data
    const cleanTemp = tempData.filter(d => 
        Number(d.OBS_VALUE) && 
        Number(d.TIME_PERIOD) &&
        d.OBS_VALUE !== null &&
        d.TIME_PERIOD !== null &&
        d.OBS_VALUE !== undefined &&
        d.TIME_PERIOD !== undefined
        
    )

    useEffect(()=>{

        let isMounted = true;
        async function fetchCrop() {
            try {
                const response = await fetch(jsonUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const cropDisaggregatedResult = await response.json();
                const dataArray = Array.isArray(cropDisaggregatedResult) ? cropDisaggregatedResult : Object.values(cropDisaggregatedResult);

                // 1. Filter the data safely after it has fully loaded into memory
                if(dataArray !== undefined){

                    const cleanCropDisaggregated = dataArray.map((d: commonProps) => ({
                        country: d['Pacific Island Countries and territories'],
                        year: d.TIME_PERIOD,
                        cropDisValue: d.OBS_VALUE,
                        cropName: d['Agricultural product']
                    }));
    
                    if (isMounted) {
                        setCropDisaggregated(cleanCropDisaggregated);
                    }
                }

            } catch (error) {
                console.error("Error loading JSON data:", error);
            }
        }

        fetchCrop();

        //what is the correlation between temp and crop yield in all countries ?

        //which country is showing strong correlation ?

        //does crop yield decline in all countries ?

        //which countries has the most reduction ?

        //which crop has the most reduction in yield and in which country ?

        return () => {
            isMounted = false;
        };

    },[selectCountry])


    return {cropDisaggregated, selectCountry, setSelectCountry}
    
    

}




