import Head from 'next/head'
import styles from '../styles/Home.module.css'

// Need to get my data with  useState and useEffect
// We need a place to store the data: useState
// We need a time to get it: useEffect
import React, { useState, useEffect } from "react"

// import next.js router
import Link from "next/link"

import fetch_pokemon from '../public/scripts/fetch_pokemon' 

export default function Home() {

  // Array of pokemon, index page is the list page
  const [pokemon, setPokemon] = useState([])

  // We use useEffect but only on start-up
  useEffect(() => {
    async function getPokemon() {

      // try {
      //   fetch_pokemon.getFileFromS3().then(
      //     response => {
      //       console.log('Output: ', response)
      //     }
      //   ).catch((err) => {console.log(err.message)})
      // } catch {
      //   console.log(err.message)
      // }

      // Get http response
      const res = await fetch('https://t6nnv61cec.execute-api.eu-central-1.amazonaws.com/dev/static', {
        headers: {
          'Content-Type': 'application/json',
        } 
      })
      

      // Set pokemon to be the .json version fo the json string received
      const res_json = await res.json()

      setPokemon(res_json)

      console.log(res_json)
            

    }

    getPokemon()
  }, [])



  return (
    <div className={styles.container}>
      {/* <div>{JSON.stringify(pokemon)}</div> */}
      <Head>
        <title>Pokemon List</title>

      </Head>

      <div className={styles.grid}>

        {pokemon.map((pokemon) => 

          <div className={styles.card} key={pokemon.id}>
            
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img src={`https://pokemon-next-tutorial.s3.eu-central-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
            
          </div>

          
        )}

      </div>
      
    </div>
  )
}
