const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const compression = require('compression')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

// create application/text parser
let textParser = bodyParser.text({ type: "text/plain" })

// POST /update gets text bodies. Test this in Postman extension
app.post('/update', textParser, (req, res) => {
  console.log(req.body)
  fs.writeFile("./src/data.js", req.body, err => {
    if (err) res.send({ message: 'Could not update data' })
    else res.send({ message: 'Data updated!' })
  })
})


const dev = app.get('env') !== "production"
if (!dev) {
  app.disable('x-powered-by')
  app.use(compression())
  app.use(morgan('common'))
  app.use(express.static(path.resolve(__dirname, 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}
else {
  app.use(morgan('dev'))
  app.use(express.static(path.resolve(__dirname, 'public')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))
