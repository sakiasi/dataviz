import { useEffect, useState } from 'react'
import cropData from '../../public/data/crop_production.json?url'

export interface dataProps{
  GEO_PICT: string,
  "Pacific Island Countries and territories": string,
  TIME_PERIOD: string,
  OBS_VALUE: number,
}

export const useCrop=()=>{

  const [crop, setCrop] = useState<dataProps[]>([])

  useEffect(()=>{

    const fetchTemp=async ()=>{

      const response = await fetch(cropData)
      const result = await response.json()
    
      console.log('RESULTS:', {
        "uniqueGEO_PICT": [...new Set(result.map(d => d.GEO_PICT))],
        "uniqueCountry": [...new Set(result.map(d => d[`Pacific Island Countries and territories`]))],
        result: result
      })

      setCrop(result)
    }

    fetchTemp()

  },[])

  return {crop}

}

