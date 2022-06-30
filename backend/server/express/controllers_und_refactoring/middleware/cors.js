const corsHeader = (req, res, next) =>{
  // Von welche Domain antworten wir auf Antworten: 
  // wenn wir ein Domain haben: dann addresse "https://www.meinFrontendDomain.com"
  // wenn nicht: *
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, OPTIONS" )
  next()
}

module.exports = corsHeader