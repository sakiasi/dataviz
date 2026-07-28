import tempData from '../../public/data/surface-temperature-anomalies.json';
import cropData from '../../public/data/Crop_Yields.json';

export const cropAnalysis = (selectedCountry = 'Vanuatu') => {
    const cleanTemp = tempData.filter(d => Number(d.OBS_VALUE) && Number(d.TIME_PERIOD));
    const cleanCrop = cropData.filter(
        d =>
            Number(d.OBS_VALUE) &&
            Number(d.TIME_PERIOD) &&
            d['Pacific Island Countries and territories'] === selectedCountry
    );

    const tempMap = new Map();
    cleanTemp.forEach(d => tempMap.set(Number(d.TIME_PERIOD), Number(d.OBS_VALUE)));

    const countryData = cleanCrop
        .map(crop => {
            const year = Number(crop.TIME_PERIOD);
            return {
                year,
                crop_value: Number(crop.OBS_VALUE),
                temp_value: tempMap.get(year) ?? null,
                country: crop['Pacific Island Countries and territories'],
            };
        })
        .filter(d => d.temp_value !== null);

    const n = countryData.length;
    if (n === 0) return { scatterData: [], trendLineData: [], slope: 0 };

    const x = countryData.map(d => d.temp_value);
    const y = countryData.map(d => d.crop_value);

    const avgX = x.reduce((sum, val) => sum + val, 0) / n;
    const avgY = y.reduce((sum, val) => sum + val, 0) / n;

    let ssxx = 0;
    let ssxy = 0;
    for (let i = 0; i < n; i++) {
        const xDiff = x[i] - avgX;
        ssxx += xDiff * xDiff;
        ssxy += xDiff * (y[i] - avgY);
    }

    const slope = ssxx === 0 ? 0 : ssxy / ssxx;
    const intercept = avgY - slope * avgX;

    const minX = Math.min(...x);
    const maxX = Math.max(...x);
    const trendLineData = [
        { temp_value: minX, crop_value: slope * minX + intercept },
        { temp_value: maxX, crop_value: slope * maxX + intercept },
    ];

    return {
        scatterData: countryData,
        trendLineData,
        slope,
    };
};

export const getAvailableCountries = () => {
    return Array.from(
        new Set(cropData.map(d => d['Pacific Island Countries and territories']))
    ).filter(Boolean);
};