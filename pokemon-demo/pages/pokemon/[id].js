// Need router to find out which id we are requesting
import { useRouter } from "next/router"

import React, { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../../styles/Details.module.css'
import Link from "next/link"

// Each specific Pokemon id is mapped here
// Returns a page with details of the specific pokemon having that id
export default function Details() {
    // Get id from query
    const {
        query: {id},
    } = useRouter();

    // Bring in useEffect and useState 
    // Pokemon, in this case, isn't going to be an array but a single pokemon object (json)
    // Detail object (json) returned has the name, type and stats for each Pokemon
    // We don't want an array so not useState([]), use useState(null) - 
    // null will be replaced by an object, once we get it
    const [pokemon, setPokemon] = useState(null)

  // We use useEffect but only on start-up
  useEffect(() => {
    async function getPokemon() {

      // Get http response
      const res = await fetch(`https://t6nnv61cec.execute-api.eu-central-1.amazonaws.com/dev/${id}.json`, {
        headers: {
          'Content-Type': 'application/json',
        } 
      })
      
      // Set pokemon to be the .json version fo the json string received
      const res_json = await res.json()

      setPokemon(res_json)
      //console.log(res_json)
    }

    // If there is an id, get the data
    if (id){
        getPokemon()
    }

  }, 
  // We need to run this effect whenever id changes
  [id])
  


  // If object is empty (no pokemon)
  if (!pokemon) {
    return null;
  }

    return <div>
        
        {/* {JSON.stringify(pokemon)} */}
        {/* Head with Pokemon's name as page title */}
        <Head>
            <title>{pokemon.name}</title>
        </Head>

        {/* A link back to the index directory, listing the Pokemon */}
        <div>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
        </div>

        {/* Content  */}

        <div className={styles.layout}>
            <div>
                {/* First Column - Image */}
                <img 
                className={styles.picture}
                src={`https://pokemon-next-tutorial.s3.eu-central-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name.english}
                />
            </div>

            {/* Second Column - Info */}
            <div>
                {/* Pokemon Name */}
                <div className={styles.name}>{pokemon.name}</div>
                {/* Pokemon Type - Type is an array so we join using comma ',' - e.g. "Grass, Poison" */}
                <div className={styles.type}>{pokemon.type.join(',')}</div>
                {/* Pokemon Table of Attributes */}
                <table>
                    <thead className={styles.header}>
                        <tr>
                            <th style={{textAlign: "left"}}>Name</th>
                            <th style={{textAlign: "right"}}>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterate through list of stats - Get name and value and create a row in table for each one */}
                        {pokemon.stats.map(({ name, value }) => (
                            <tr key={name}>
                                <td className={styles.attribute}>{name}</td>
                                <td style={{textAlign: "right"}}>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
        
    </div>
}