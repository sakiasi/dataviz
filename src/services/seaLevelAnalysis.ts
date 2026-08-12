import { useMemo, useState } from 'react'
import seaData from '../../public/data/Sea Level Anomalies.json'
import * as ss from 'simple-statistics'
import tempData from '../../public/data/surface-temperature-anomalies.json'

export interface SeaInterface {
    value: number,
    year: number,
    country:string,
}

export const useSeaLevelAnalysis=(externalSelectedCountries?:string[])=>{

    const [internalSelected, setInternalSelected] = useState<string[]>(['Papua New Guinea','Solomon Islands','Tokelau','Northern Mariana Islands']);
    
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

    //correlation
   //correlation
    const tempLookup = useMemo(() => {
        const map = new Map<string, number>();
        tempData.forEach(d => {
            const country = d['Pacific Island Countries and territories']
            const year = d.TIME_PERIOD
            const value = d.OBS_VALUE

            if (country && year !== undefined && value !== undefined && value !== null) {
                // Compound key format: "CountryName-Year"
                map.set(`${country}-${year}`, value);
            }
        });
        return map;
    }, []);

    const { countryInfluence } = useMemo(() => {
        const countryGroups: Record<string, { xTemp: number[]; ySea: number[]; pairs: [number, number][] }> = {};
        const yearlyRows: Record<number, Record<string, { sea: number; temp: number }>> = {};

        seaData.forEach(sea => {
            const country = sea['Pacific Island Countries and territories'];
            const year = sea.TIME_PERIOD;
            const seaValue = sea.OBS_VALUE;

            if (!country || year === undefined || seaValue === undefined || seaValue === null) return;

            // Generate matching key for the temperature dictionary
            const key = `${country}-${year}`;
            if (tempLookup.has(key)) {
                const tempValue = tempLookup.get(key)!;

                // Group for statistical calculation
                if (!countryGroups[country]) {
                    countryGroups[country] = { xTemp: [], ySea: [], pairs: [] };
                }
                countryGroups[country].xTemp.push(tempValue);
                countryGroups[country].ySea.push(seaValue);
                countryGroups[country].pairs.push([tempValue, seaValue]); // [X, Y] for regression

                // Group for chronological UI charting options
                if (!yearlyRows[year]) yearlyRows[year] = {};
                yearlyRows[year][country] = { sea: seaValue, temp: tempValue };
            }
        });

        // Format chronological timeline chart data for components like Recharts
        const formattedChartData = Object.entries(yearlyRows)
            .map(([yearStr, countries]) => {
                const row: Record<string, any> = { year: Number(yearStr) };
                Object.entries(countries).forEach(([cName, vals]) => {
                    row[`${cName}_sea`] = vals.sea;
                    row[`${cName}_temp`] = vals.temp;
                });
                return row;
            })
            .sort((a, b) => a.year - b.year);

        // STEP 4: Run cross-dataset statistics (Air Temp vs Ocean Temp)
        const influenceAnalysis = Object.entries(countryGroups)
            .filter(([_, data]) => data.pairs.length > 1) // Simple statistics requires at least 2 points
            .map(([country, data]) => {
                const regression = ss.linearRegression(data.pairs);
                const rValue = ss.sampleCorrelation(data.xTemp, data.ySea);
                const rSquared = Math.pow(rValue, 2);

                return {
                    country,
                    dataPointsCount: data.pairs.length,
                    slope: regression.m,          // Ocean degrees increase per 1°C air increase
                    intercept: regression.b,      // Theoretical baseline sea level anomaly
                    correlation: rValue,          // r value (-1 to +1)
                    rSquared: rSquared            // R² value (0 to 1): percentage of variation explained
                };
            });

        return { tempseaChartData: formattedChartData, countryInfluence: influenceAnalysis };

    }, [tempLookup]);

    // Filtered lists matching current selections for your frontend view
    const filteredInfluence = useMemo(() => {
        return countryInfluence.filter(d => selectedCountries.length === 0 || selectedCountries.includes(d.country));
    }, [countryInfluence, selectedCountries]);


    //which has the most/least influence from temperature(regression)

    return {selectedCountries, countryInfluence, setSelectedCountries, countryList, chartData, lineData, slope, influenceAnalysis: filteredInfluence}


}