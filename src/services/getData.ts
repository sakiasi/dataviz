import { useEffect, useState } from 'react'
import cropData from '../../public/data/crop_production.json?url'
import * as ss from 'simple-statistics';

export interface dataProps {
  [key: string]: string | number | undefined;
  GEO_PICT?: string;
  "Pacific Island Countries and territories"?: string;
  TIME_PERIOD?: string;
  OBS_VALUE?: number;
  AGRICULTURE_PRODUCTION_TYPE?: "CROP_YIELD" | "LVST_YIELD";
  "Agricultural product"?: string;
}

export const useCrop=()=>{

  const [crop, setCrop] = useState<dataProps[]>([])
  const [uniqueGEOPict, setUniqueGEOPict] = useState<(string | undefined)[]>([])
  const [selectedCountry, setSelectedCountry] = useState('FJ')
  const [selectedCrop, setSelectedCrop] = useState('Oranges') 
  const [yRange, setYRange] = useState<number[]>([])

  useEffect(()=>{

    const fetchTemp=async ()=>{
    const response = await fetch(cropData)
    const result:dataProps[] = await response.json()
    setUniqueGEOPict([...new Set(result.map(d => d.GEO_PICT))])

    //by country
    const cropCountry = result.filter(d => d.GEO_PICT?.includes(selectedCountry))
    
    //by crop name
    const cropsByName = cropCountry.filter(d => d['Agricultural product']?.toLowerCase()===selectedCrop.toLowerCase())
    const cropName = [...new Set(cropCountry.map(d => d['Agricultural product']))]
    console.log('CROP NAME:', cropName)
    
    //define year gap
    const gap = 2
    const cropYears = cropsByName.map(y => Number(y.TIME_PERIOD))
    console.log('CROP Years:', cropYears)
    const uniqueSortedYears = [...new Set(cropYears)].sort((a, b) => a - b)

    const yearGap = uniqueSortedYears.reduce((acc, year) => {

      if (acc.length === 0 || year - acc[acc.length - 1] >= gap) {
        acc.push(year)
      }
      return acc
      
    }, [])

    //by year gap
    const cropsByYearGap = cropsByName.filter(d => yearGap.includes(Number(d.TIME_PERIOD)));
    console.log('CROP BY YEAR GAP:', cropsByYearGap)
    setCrop(cropsByYearGap)

    //define y
    const cropsByValue = cropsByYearGap.map(d => d.OBS_VALUE)
    const y = [cropsByValue[0],cropsByValue[cropsByValue.length-1]]
    setYRange(y)

    //define trend
    const trendShape = cropsByYearGap.map(d => ([Number(d.TIME_PERIOD),Number(d.OBS_VALUE)]))
    const trend = ss.linearRegression(trendShape)
    const sign = Math.sign(trend.m)
    console.log('TREND SHAPE:', trend.m)
    console.log('SIGN:', sign)

    //1. show all crops with down trend
    const sortCrops = [...result].sort((a, b) => 
      String(a['Agricultural product'] || '').localeCompare(String(b['Agricultural product'] || ''))
    );
    
    const groupCrops = cropCountry.reduce<Record<string, [number, number][]>>((acc, d) => {
        const product = d['Agricultural product'];
        if (!product) return acc;
        if (!acc[product]) acc[product] = [];
        acc[product].push([Number(d.TIME_PERIOD), Number(d.OBS_VALUE)]);
        return acc;
    }, {});

    const analyzedTrends = Object.entries(groupCrops).map(([product, points]) => {
        if (points.length < 2) return { product, trend: 'consolidate' };
        
        const regression = ss.linearRegression(points);
        const slope = regression.m;
        const threshold = 0.001; // Adjust this threshold if needed

        let trend = 'consolidate';
        if (slope > threshold) trend = 'up';
        else if (slope < -threshold) trend = 'down';

        return { product, slope, trend };
    });

    const downTrends = analyzedTrends.filter(item => item.trend === 'down');
    const upTrends = analyzedTrends.filter(item => item.trend === 'up');
    const consolidating = analyzedTrends.filter(item => item.trend === 'consolidate');

    console.log('DOWN TRENDS:', downTrends);
    console.log('UP TRENDS:', upTrends);
    console.log('CONSOLIDATING:', consolidating);

    }

    fetchTemp()

  },[selectedCountry,selectedCrop])

  return {crop,uniqueGEOPict,selectedCountry,yRange}

}

