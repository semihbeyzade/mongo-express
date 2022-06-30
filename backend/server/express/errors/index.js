require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())


// GET:
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/daten', (req,res) => {
  res.send('Daten gepostet')
})

// Nach allen Pfaden: Für alle anfragen, für die es keine Pfade gibt: Wildcard *

app.use('*', (req,res, next) => {
// Fehlermeldung ersetellen 
  let fehler = new Error(`${req.originalUrl} gibt es nicht`)
  fehler.statusCode = 404;
// weitergeben 
  next(fehler)
})

// Funktion, die die Fehlermeldung fängt und an den Klienten schickt: 

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500 ).send({
      fehlerMedlung: {
        nachricht: err.message || 'Server Fehler'
      }
    })
}) 

app.listen(port, () => {
  console.log(`Server läuft auf port ${port}` );
})