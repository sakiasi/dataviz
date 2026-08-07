import { useState } from 'react'
import seaData from '../../public/data/Crop_Yields.json'
import * as ss from 'simple-statistics'

export interface SeaInterface {
    value: number,
    year: number,
    country:string,
}

export const useCropAnalysis=(externalSelectedCountries?:string[])=>{

    const [internalSelected, setInternalSelected] = useState<string[]>([
  'Marshall Islands',
  'Kiribati',
  'Papua New Guinea',
  'Micronesia, Federated State of',
  'Fiji'
]);
    
    // Use external state if passed from parent, otherwise fallback to internal
    const selectedCountries = externalSelectedCountries ?? internalSelected;
    const setSelectedCountries = setInternalSelected;

    const cleanData = seaData.filter(d => 
        d.TIME_PERIOD !== null &&
        d.TIME_PERIOD !== undefined &&
        d.OBS_VALUE !== undefined &&
        d.OBS_VALUE !== null &&
        (selectedCountries.length === 0 || selectedCountries.includes(d['Pacific Island Countries and territories']) ) &&
        d.TIME_PERIOD % 3 === 0
    )
    .sort((a,b) => a.TIME_PERIOD - b.TIME_PERIOD)    

    const groupByCountry = cleanData.reduce<Record<string,SeaInterface[]>>((acc,value) => {

        const country = value['Pacific Island Countries and territories']

        if(!acc[country]){
            acc[country] = []
        }

        acc[country].push({country,value:value.OBS_VALUE,year:value.TIME_PERIOD})

        return acc

    },{})

    const chartData = Array.from(new Set((cleanData.map(d => d.TIME_PERIOD))))
    .map(year => {
        const row:Record<string,number> = {year}
        Object.entries(groupByCountry).forEach(([country,records]) => {
            const found = records.find(d => d.year === year)
            if(found){
                row[country] = found.value
            }
        })

        return row

    })

    const countryList = Array.from(new Set(seaData.map(d => d['Pacific Island Countries and territories'])))

    const lineData = Object.keys(groupByCountry).map(d => ({countryName:d}))

    const dataSlope = seaData.filter(d => 
        d.TIME_PERIOD !== null &&
        d.TIME_PERIOD !== undefined &&
        d.OBS_VALUE !== undefined &&
        d.OBS_VALUE !== null &&
        d.TIME_PERIOD % 20
    )
    .sort((a,b) => a.TIME_PERIOD - b.TIME_PERIOD)
    .reduce<Record<string,SeaInterface[]>>((acc,value) => {

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

    console.log('Slope Data:', slope)

    //which has the most/least influence from temperature(regression)

    return {selectedCountries, setSelectedCountries, countryList, chartData, lineData, slope}

}