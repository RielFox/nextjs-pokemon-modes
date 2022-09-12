#A little curl, a post (request) to the end-point url we want to revalidate
curl "https://pokemon-static-site-generation.vercel.app/api/revalidate" \
    -X POST  \ # Let this be a POST request ('\ used for next line')
    -H "Content-Type: application/json" \ # Header definiton of request - this is a json POST (expected content type)
    -d "[\"/pokemon/1\"]"# Finally, what do we want fromt he data, we put a little '-d', open an array, escape out a string and put in our URL
# Revalidating the first Pokemon (Bulbasaur URL)