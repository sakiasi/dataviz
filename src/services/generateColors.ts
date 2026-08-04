import { colors } from "../constants/colors";
import { useTemperature } from "./tempAnalysis";


export const useColors=(selectedCountries:string[])=>{

    const { lineData } = useTemperature(selectedCountries);

    const hashColor = lineData.map((d) => {
        const hash = d.countryName
            .toLowerCase()
            .split("")
            .reduce((acc, value) => {
            return (acc = (acc * 33 + value.charCodeAt(0)) >>> 0);
            }, 5381);

        return colors[hash % colors.length];
    });

    return {hashColor}


}