import tempData from '../../public/data/surface-temperature-anomalies.json'
import cropData from '../../public/data/Crop_Yields.json'
import seaData from '../../public/data/Sea Level Anomalies.json'
import oceanData from '../../public/data/WarmingOcean.json'
import individualImpactData from '../../public/data/Number of directly affected persons attributed to disasters.json'
import economicLossData from '../../public/data/EconomicLoss.json'

export const colors = [
  "#e6194b", // Vibrant Red
  "#3cb44b", // Green
  "#ffe119", // Yellow
  "#4363d8", // Blue
  "#f58231", // Orange
  "#911eb4", // Purple
  "#42d4f4", // Cyan
  "#f032e6", // Magenta
  "#bfef45", // Lime
  "#fabed4", // Pink
  "#469990", // Teal
  "#dcbeff", // Lavender
  "#9A6324", // Brown
  "#fffac8", // Light Yellow (use with caution or swap if too bright)
  "#800000", // Maroon
  "#aaffc3", // Mint
  "#808000", // Olive
  "#ffd8b1", // Apricot
  "#000075", // Navy
  "#a9a9a9", // Grey
  "#e41a1c", // Classic Red
  "#377eb8", // Classic Blue
  "#4daf4a", // Classic Green
  "#984ea3", // Classic Purple
  "#ff7f00"  // Classic Orange
];

const tempCountries = tempData.map(d => d['Pacific Island Countries and territories'])
const cropCountries = cropData.map(d => d['Pacific Island Countries and territories'])
const seaCountries = seaData.map(d => d['Pacific Island Countries and territories'])
const oceanCountries = oceanData.map(d => d['Pacific Island Countries and territories'])
const individualImpactCountries = individualImpactData.map(d => d['Pacific Island Countries and territories'])
const economicLossCountries = economicLossData.map(d => d['Pacific Island Countries and territories'])

export const countries = Array.from(new Set([...tempCountries,...cropCountries,...seaCountries,...oceanCountries,...individualImpactCountries,...economicLossCountries]))

export const countryColor = countries.reduce((acc,value,index) => {

  acc[value] = colors[index % colors.length]

  return acc

}, {} as Record<string, string>)


