import React from 'react'
import styles from './Country.module.css'

function Country({cases, flag, country, handleCountry}){
    return (
        <div>
            <div className={styles.button}>
                <button onClick={handleCountry} className={styles.btn}></button>
            </div>
        </div>
    )
}

export default Country