const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

// create application/text parser
let textParser = bodyParser.text({ type: "text/plain" })

// POST /update gets text bodies. Test this in Postman extension
app.post('/update', textParser, (req, res) => {
  console.log(req.body)
  fs.writeFile("./src/data.js", req.body, err => {
    if (err) res.send({message: 'Could not update data'})
    else res.send({message: 'Data updated!'})
  })
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))
