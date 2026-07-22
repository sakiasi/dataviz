import { useEffect, useState } from 'react'
import cropData from '../../public/data/crop_production.json?url'

export interface dataProps{
  GEO_PICT?: string,
  uniqueGeoPict?: (string|undefined)[],
  "Pacific Island Countries and territories"?: string,
  TIME_PERIOD?: string,
  OBS_VALUE?: number,
}

export const useCrop=()=>{

  const [crop, setCrop] = useState<dataProps[]>([])
  const [uniqueGEOPict, setUniqueGEOPict] = useState<(string | undefined)[]>([])

  useEffect(()=>{

    const fetchTemp=async ()=>{

      const response = await fetch(cropData)
      const result:dataProps[] = await response.json()
      setUniqueGEOPict([...new Set(result.map(d => d.GEO_PICT))])

      setCrop(result)
    }

    fetchTemp()

  },[])

  return {crop,uniqueGEOPict}

}

