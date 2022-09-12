// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// -- Forced Revalidation --
// What happens when you want to force the page to revalidate
// e.g. I have an update, I want to revalidate right now

// This is an express endpoint
export default async function handler(req, res) {
    // One of the things they added is the ability to do res.unstable_revalidate() and add in your URL e.g. res.unstable_revalidate('/pokemon/1')
    // We want to make a real api end-point here, not just for a single pokemon
    // res.unstable_revalidate('/pokemon/1')

    // We first get a list of all the URLs we want to revalidate
    // We use the body for that, so the body will be an array
    // We are going to assume we have a URL and it is in req.body (body of the request)
    for (const url of req.body) {
        // We expect body to be  json array which will contain the URLs we want to revalidate
        await res.unstable_revalidate(url)
    }

    // We say that on Success status 200, revalidate 
    res.status(200).json({ revalidate: true })
  }