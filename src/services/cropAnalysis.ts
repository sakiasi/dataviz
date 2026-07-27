
import tempData from '../../public/data/surface-temperature-anomalies.json'
import cropData from '../../public/data/Crop_Yields.json'

export const tempFn=()=>{
    
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
        d.TIME_PERIOD !== undefined
    )
    
    // 1. Create a Map and index the temperature data by TIME_PERIOD
    const tempMap = new Map();
    cleanTemp.forEach(d => {
        tempMap.set(d.TIME_PERIOD, d.OBS_VALUE);
    });

    // 2. Use array .map() to combine the crop data with the temperature Map
    const combinedData = cleanCrop.map(crop => {
        return {
            TIME_PERIOD: crop.TIME_PERIOD,
            crop_value: crop.OBS_VALUE,
            temp_value: tempMap.get(crop.TIME_PERIOD) || null
        };
    }).filter(d => d.temp_value !== null);

    console.log('CROP ANALYSIS:', combinedData)
    
    //3. determine if 1°C increase in mean surface temperature, crop yield decreases by [Insert Number] [Insert Unit, e.g., tons per hectare]. 
    function calculateTemperatureImpact() {
        const n = combinedData.length;

        // Extract X (temperature) and Y (crop yield) values
        const x = combinedData.map(d => Number(d.temp_value));
        const y = combinedData.map(d => Number(d.crop_value));

        // Calculate means (averages)
        const avgX = x.reduce((sum, val) => sum + val, 0) / n;
        const avgY = y.reduce((sum, val) => sum + val, 0) / n;

        // Calculate components for the linear regression slope (m) formula
        let ssxx = 0; // Sum of squares for X
        let ssxy = 0; // Sum of products for X and Y

        for (let i = 0; i < n; i++) {
            const xDiff = x[i] - avgX;
            ssxx += xDiff * xDiff;
            ssxy += xDiff * (y[i] - avgY);
        }

        // The slope represents the change in Y per 1-unit increase in X
        const slope = ssxy / ssxx;

        return slope;
    }

    // Usage:
    const yieldImpactPerDegree = calculateTemperatureImpact();
    console.log(`With a 1°C increase, crop yield changes by: ${yieldImpactPerDegree}`);
       
    

}




