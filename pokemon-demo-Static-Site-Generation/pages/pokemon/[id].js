// Need router to find out which id we are requesting
// import { useRouter } from "next/router"

// import React, { useState, useEffect } from "react"

import React from "react"
import Head from 'next/head'
import styles from '../../styles/Details.module.css'
import Link from "next/link"

// With a dynamic page like this (using dynamic routing based on pokemon id),
// you need to know what all of the routes are in advance.
// The way you do that is that you create another function called getStaticPaths()
export async function getStaticPaths() {
    // What it does is it returns an object which has a list 
    // of all of the different possible paths that we should be generating
    // These paths are specified by their parms, from this we just use the 'id'.

    // First, get the list of all pokemon - same as in index page
    const res = await fetch('https://t6nnv61cec.execute-api.eu-central-1.amazonaws.com/dev/static', {
        headers: {
          'Content-Type': 'application/json',
        } 
    })

    // Now, get the json data
    const pokemon = await res.json()

    // Return a list of paths
    // Iterate through all pokemon and, for each, create an object
    // That object will have params and within those we will get the 'id'
    // We need to convert that 'id' to a string from an integer
    return {
        paths: pokemon.map((pokemon) => ({
            params: { id: pokemon.id.toString()}
        })),
        // The other thing we need to do is define whether we want a fallback page
        // A page to appear if that pokemon (path) doesn't exist
        // In this case, we don't need one, so set 'fallback: false'
        fallback: false
    }

}

// Change getServerSideProps to getStaticProps here
export async function getStaticProps( { params } ) {
    // Get http response
    const res = await fetch(`https://t6nnv61cec.execute-api.eu-central-1.amazonaws.com/dev/${params.id}.json`, {
        headers: {
          'Content-Type': 'application/json',
        },
        // -- Revalidation --
        // Say we change the json file(s) for one or some of the pokemon after building the SSG
        // Static pages wont be updated with fresh data (e.g. if the json it got the data from changes)
        // The data will remain 'frozen' as it was when the Statically Generated Site was built and that data was fetched
        // This will revalidate every 30 seconds
        // This means that anytime that route gets hit it will go and actually make the update to the page if it hasn't done that update withint he last 30 seconds (in this case)
        // This is basically a throttle, meaning you will update that page but only every 30 seconds (you pick that time interval)
        // Every 30 seconds, checks if changes have been made and reflects them on the static page
        // This is nice if you have a high-traffic page where the 'serious' contents of that page won't change that often
        // (e.g. an e-commerce application - product detail page or home page, reviews, comments - 
        // you don't want them updating with every single request - won't change that often, can wait a bit to be refreshed)
        // This gives you the ability to revalidate that page - but throttled (at the level you want)
        // revalidate: 30 //(disabled since using forced revalidation)
        
        // -- Forced Revalidation --
        // What happens when you want to force the page to revalidate
        // e.g. I have an update, I want to revalidate right now
        // Defined in /api/revalidate.js
    })

    return {
        props: {
            pokemon: await res.json()
        }
    }
}

// Each specific Pokemon id is mapped here
// Returns a page with details of the specific pokemon having that id
export default function Details( { pokemon } ) {
// --- Comment out client-side rendering code ---
//     // Get id from query
//     const {
//         query: {id},
//     } = useRouter();

//     // Bring in useEffect and useState 
//     // Pokemon, in this case, isn't going to be an array but a single pokemon object (json)
//     // Detail object (json) returned has the name, type and stats for each Pokemon
//     // We don't want an array so not useState([]), use useState(null) - 
//     // null will be replaced by an object, once we get it
//     const [pokemon, setPokemon] = useState(null)

//   // We use useEffect but only on start-up
//   useEffect(() => {
//     async function getPokemon() {

//         const res = await fetch(`https://t6nnv61cec.execute-api.eu-central-1.amazonaws.com/dev/${params.id}.json`, {
//             headers: {
//               'Content-Type': 'application/json',
//             } 
//         })
      
//       // Set pokemon to be the .json version fo the json string received
//       const res_json = await res.json()

//       setPokemon(res_json)
//       //console.log(res_json)
//     }

//     // If there is an id, get the data
//     if (id){
//         getPokemon()
//     }
//   }, 
//   // We need to run this effect whenever id changes
//   [id])
  
//   // If object is empty (no pokemon)
//   if (!pokemon) {
//     return null;
//   }

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