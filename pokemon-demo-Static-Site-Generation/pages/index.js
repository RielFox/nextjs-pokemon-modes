import Head from 'next/head'
import styles from '../styles/Home.module.css'

// No need for useState or useEffect anymore
import React from "react"

// import next.js router
import Link from "next/link"

// Causes dependency bugs
//import { response } from 'express'

// We need to do this request (fetch) at server side time, 
// thus we use a new exported asynchronous function called 'getServerSideProps'
export async function getStaticProps() {
  // What it does is that it makes any requests that you need to any services,
  // gethers all that data and returns an object that has props in it
  // and then those props are sent to the react component which renders them at server-time
  
  // Get http response
  const res = await fetch('https://t6nnv61cec.execute-api.eu-central-1.amazonaws.com/dev/static', {
    headers: {
      'Content-Type': 'application/json',
    } 
  })

  // Return an object with props in it
  // The props will have 'pokemon' as the name of of the prop
  // and the value will be the json list of pokemon
  return {
    props: {
      pokemon: await res.json(),
    }
  }
  
}

// Here, we take pokemon as a prop passed from getServerSideProps()
// We get rid of all the Client-Side code (useState-useEffect) (commented)
export default function Home( {pokemon} ) {

  // Client-Side code is not needed anymore
  // // Array of pokemon, index page is the list page
  // const [pokemon, setPokemon] = useState([])

  // // We use useEffect but only on start-up
  // useEffect(() => {
  //   ...
  // }, [])

  // If you view page source, all of the fetched pokemon will appear

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
