let mockDaten = require('../mockData')

exports.createNewUser = (req, res) => {
  // im body name holen: req.body.name
   let nutzerName = req.body.name
   // TODO: ändere id, soll hier erstellt werden und nich vom body kommen!
   let { id } = req.body  
// zu dem Arry von mockDaten hinzufügen
  mockDaten = [ ...mockDaten, { name: nutzerName, id: id }]
  console.log(mockDaten);
  // response: json success true, name
  res.status(201).json({nachricht : `${nutzerName} wurde hinzugefügt!`})
}

exports.deleteAllUsers = (req,res) => {
  mockDaten = []
  console.log(mockDaten);
  res.status(200).send('Alle daten wurden gelöscht!')
}

exports.getUser = (req,res) => {
  let id = req.params.id
  // daten für ein nutzer holen: 
  // array zugreifen: 
  let nutzer =  mockDaten[id]
  if(nutzer === undefined) {
    let fehler = new Error('Es gibt kein Nutzer mit diesem ID')
    fehler.statusCode = 404
    throw fehler
  }
  res.send(`Hi ${nutzer.name}`)

  // "nachricht": "Cannot read properties of undefined (reading 'name')"
}

exports.deleteUser = (req,res) => {
  // id vom request holen
  let id = req.params.id
  //filter um elemente zu behalten, die nicht das id haben
  let newArray = mockDaten.filter(person => person.id != id)
  // neue Array mockDaten überschreiben
  mockDaten = newArray
  console.log(mockDaten);
  // antwort senden
  res.status(200).send('Daten wurden gelöscht!')
}

exports.updateUser = (req, res) => {
  // id finden
  let id = req.params.id
  let neuerName = req.body.name
  let alter = req.body.alter
  // ganze array durch gehen, ein eintrag ändern und alles zurückgeben
  let newArray = mockDaten.map(person => {
    return person.id === id ? { ...person, name: neuerName, alter: alter} : person
  })
  console.log(newArray);
  mockDaten = newArray
  // antwort schicken 
  res.status(204).send('Daten geändert')
}