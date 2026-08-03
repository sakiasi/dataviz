
import type React from "react"

export const handleSelectCountries=(country:string, setSelectedCountries:React.Dispatch<React.SetStateAction<string[]>>, selectedCountries:string[])=>{

    //check if country exist in list
    const index = selectedCountries.findIndex(d => d === country)    

    if(index !== -1) {
        //item exist, remove it
        const result = selectedCountries.filter((_,i) => i !== index) 
        setSelectedCountries(result)
    } else {
        setSelectedCountries([...selectedCountries,country])
    }
    

}