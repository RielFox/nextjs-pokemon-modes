// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// This is an express endpoint
// Sample - if you go to url/api/hello, it will return a json with { name: 'John Doe' }
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
