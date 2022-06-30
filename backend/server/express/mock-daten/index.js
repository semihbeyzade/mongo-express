require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
// user fake daten: 

let mockDaten = require('./mockData')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())


// GET:
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/nutzer/:id', (req,res) => {
    let id = req.params.id
    // daten für ein nutzer holen: 
    // array zugreifen: 
    let nutzer =  mockDaten[id]
    res.send(`Hi ${nutzer.name}`)
} )

//POST

app.post('/nutzer', (req, res) => {
  // im body name holen: req.body.name
   let nutzerName = req.body.name
   let { id } = req.body  
// zu dem Arry von mockDaten hinzufügen
  mockDaten = [ ...mockDaten, { name: nutzerName, id: id }]
  console.log(mockDaten);
  // response: json success true, name
  res.status(201).json({nachricht : `${nutzerName} wurde hinzugefügt!`})
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