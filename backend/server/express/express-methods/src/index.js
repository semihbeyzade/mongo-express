/*
    Routing in express gibt uns mehrere moglichkeiten routen festzulegen, zu sortieren und einfacher zu managen. Wir haben die möglichkeit mehrere methoden auf dem selben pfad zhu legen, was in CRUD anwendungen (Create Read Update Delete) standardmäßig gemacht wird, eine produktionsrelevante CRUD anwendung hat also nicht routen wie:
    - POST:    /todo/create             Für das erstellen von inhalten
    - GET:     /todo/all                Für das anzeigen von allen inhalten
    - PUT:     /todo/:id/update         Für das updaten/ändern von inhalten
    - DELETE   /todo/:id/delete         Für das löschen von inhalten

    sondern so:
    - POST:    /todos                   Für das erstellen von inhalten
    - GET:     /todos                   Für das anzeigen von allen inhalten
    - GET:     /todos/:id               Für das anzeigen eines spezifischen inhaltes
    - PUT:     /todos/:id               Für das updaten von spezifischen inhalten
    - DELETE:  /todos/:id               Für das löschen eines spezifischen inhaltes

    Da wir verschiedene methoden auf den selben pfad legen können, ist so eine struktur sehr einfach anzulegen.
*/

// Wir importieren express:
const express = require('express');

// wir importieren den body-parser:
const bodyParser = require('body-parser');

// wir erstellen eine instanz von express:
const app = express();

// wir definieren den port auf dem express laufen soll:
const port = 3010;

// wir stellen unseren bodyParser ein:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 1. Mehrere Methoden auf der Selben Route:
// wenn wir, wie bisher gelernt, eine route anlegen, müssen wir für jede einzelne route unsere express instanz aufrufen:
//            request object, response object
app.get('/', (req, res) =>
{
    // wir senden eine antwort:
    res.status(200).send("GET: Hallo Welt!");
});
app.post('/', (req, res) =>
{
    // möglichkeit 1 (ein bestimmter eintrag fehlt):
    // if(req.body.id !== undefined)
    // {
    //     res.status(200).send("Der body ist nicht leer");
    // }
    // else
    // {
    //     res.status(500).send("Der body ist falsch");
    // }

    // möglichkeit 2 (leerer body):
    if(Object.keys(req.body).length === 0)
    {
        res.status(500).send("Der body ist leer");
    }
    else
    {
        res.status(200).send("Der body ist ok");
    }
});

// 2. Method chaining

// express hat eine methode namens .route();, die dafür sorgt, code wiederholungen zu verhindern, und das mangement von routen zu erleichtern. Anstelle das wir in .get(); oder .post(); oder den anderen methoden, den pfad angeben, den wir auslesen wollen, geben wir ihn in .route(); an, und rufen .get(); und .post() und co. nur mit einem callback auf.
app.route("/test")
.get((req, res) =>
{
    res.status(200).send("Hallo GET");
})
.post((req, res) =>
{
    res.status(200).send("Hallo POST");
})
.put((req, res) =>
{
    res.status(200).send("Hallo PUT");
})
.delete((req, res) =>
{
    res.status(200).send("Hallo DELETE");
});

// Beispiel aus dem beispiel oben auf der seite:
app.route("/todos")
//- POST:    /todos                   Für das erstellen von inhalten
.post((req, res) => res.send("POST /todos"))
//- GET:     /todos                   Für das anzeigen von allen inhalten
.get((req, res) => res.send("GET /todos"));

app.route("/todos/:id")
//- GET:     /todos/:id               Für das anzeigen eines spezifischen inhaltes
.get((req, res) => res.send("GET /todos/:id"))
//- PUT:     /todos/:id               Für das updaten von spezifischen inhalten
.put((req, res) => res.send("PUT /todos/:id"))
//- DELETE:  /todos/:id               Für das löschen eines spezifischen inhaltes
.delete((req, res) => res.send("DELETE /todos/:id"));

// wir können wir wir sehen, verschiedene request methoden auf der selben URL ausführen, und diese dann auch sehr übersichtlich und DRY schreiben, wenn wir .route(); dafür benutzen.

// 3. Mehrere callbacks auf einer methode

// wir können nicht nur verschidene methoden auf der selben url ausführen, sondern auch mehrere callbacks auf der selben metrhode ausführen, die hinteinander abgearbeitet werden

// wir schreiben 2 funktionen die wir in die methode als callback übergeben:
const callback1 = (req, res, next) =>
{
    console.log("Dies passiert als erstes");

    // wir müssen next übergeben, damit die zweite funktion ausgeführt wird.
    next();
}

const callback2 = (req, res, next) =>
{
    console.log("Dies passiert als zweites");

    next();
}

const callback3 = (req, res) =>
{
    console.log("Dies hier passiert als letztes");

    // hier senden wir unsere response:
    res.status(200).send("Es hat geklappt!");

    // hier müssen wir kein .next(); übergeben, da dies am ende unseres requests ist.
}

app.route("/callback").get([ callback1, callback2, callback3 ]);

app.listen(port, () => console.log("Hallo server auf port", port));
