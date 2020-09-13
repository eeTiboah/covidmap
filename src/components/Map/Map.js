import React, {useState, useEffect} from 'react';
import {fetchCountryData} from '../../api'
import {Country} from '../../components'
import GoogleMapReact from 'google-map-react';
import styles from './Map.module.css'
import cx from 'classnames'
import CountUp from 'react-countup';
  
function Map(){
    const [fetchCountry, setFetchCountry] = useState([])
    const [countryDisplay, setCountryDisplay] = useState(null)

    useEffect(()=>{
        const abortController = new AbortController()
        // const signal = abortController.signal

        async function getCountry(){
            const data = await fetchCountryData()
            setFetchCountry(data);
            abortController.abort()
        }
        getCountry()
    }, [])

    const Progress=({done, color})=>{
        const [style, setStyle] = useState({})
        setTimeout(()=>{
            const newStyle = {
                opacity: 1,
                width: `${done}%`,
                backgroundColor: `${color}`
            }
            setStyle(newStyle)
        })
        return (<div className={styles.progress}>
            <div className={styles.progress_done} style={style}></div>
        </div>
    
    
       )}


    const countries = fetchCountry.map((country, index)=>{
        const latLong = [{lat: country.lat,long: country.long}]

        const handleCountries = ()=>{
            
            let countryHd = (
                <div>
                    <div className={styles.country_details}>
                        <div className={cx(styles.country_flag, styles.item)}>
                            <h2>{country.country}</h2>
                            <img src={country.flag} alt="Country Flag" />
                        </div>
                        <div>
                            <h2>Confirmed</h2>
                            <CountUp style={{textAlign: "justify"}} start={0} end={country.cases} duration="5" separator="," />
                        </div>
                        <div className={cx(styles.country_info)}>
                            <div>
                                <div className={styles.item}>
                                    <div className={styles.head}>
                                        <p>Recovered</p>
                                        <CountUp className={styles.count} start={0} end={country.recovered} duration="5" separator="," />
                                    </div>
                                    <Progress done={country.recoveredPerc} color="green"/>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.head}>
                                        <p>Active</p>
                                        <CountUp className={styles.count} start={0} end={country.active} duration="5" separator="," />
                                    </div>
                                    <Progress done={country.activePerc} color="red"/>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.head}>
                                        <p>Deaths</p>
                                        <CountUp className={styles.count} start={0} end={country.deaths} duration="5" separator="," />
                                    </div>
                                    <Progress done={country.deathsPerc} color="black"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            return setCountryDisplay(countryHd)
        }

        return (
            <Country key={index} 
            {...latLong}
            lat={country.lat}
            lng={country.long}
            data={country}
            handleCountry={handleCountries}
             />
        )
    })

    return (
        <div>
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyC4dspbzseGGUeKUBRgeRdvC-6P_B4I9Qc"}}
                defaultCenter={{lat: 7.9528, lng: -1.0307}}
                defaultZoom={1}>
                {countries}
                </GoogleMapReact>
            </div>


            <div className={styles.country_display}>
                {countryDisplay}
            </div>
      </div>
      
    )
}
 
export default Map;