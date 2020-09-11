import axios from 'axios'


const url = 'https://corona.lmao.ninja/v2/countries'

export const fetchCountryData = async()=>{
    const {data} = await axios.get(url)
    return data.map(({cases, country, active, recovered, deaths, countryInfo:{flag, lat, long}})=>{
        const activePerc = (active / (cases-deaths)) * 100
        const recoveredPerc = (recovered / (cases-deaths)) * 100
        const deathsPerc = (deaths / cases) * 100

        return {cases, country, active, recovered, deaths, flag, lat, long, activePerc, recoveredPerc, deathsPerc}
    });
}