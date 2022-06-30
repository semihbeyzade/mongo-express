require('dotenv').config();

// wir importieren express
const express = require('express');

// wir importieren das modul body-parser, damit wir den body in post requests auslesen können
const bodyParser = require('body-parser');

// wir erstellen eine instanz von express
const app = express();

// wir erstellen eine variable für die port nummer, auf der wir den server laufen lassen wollen
const port = process.env.PORT || 3000; // oder 3000

// wir sagen express, es soll als middleware den body-parser nutzen, um die daten der url zu dekodieren - die einstellung extended geben wir auch an, um erweitertes modernes url format nutzen zu können.
app.use(bodyParser.urlencoded({ extended: true }));

// damit express auch json auslesen und dekodieren kann, falls wir ein frontend bauen, in dem wir die daten nutzen wollen, können wir json auch verwenden.
app.use(bodyParser.json());

// wir erstellen eine controller für die methode POST:
app.post('/', (req, res) =>
{
    // innerhalb von post können wir unsere req und res objekte auslesen:
    console.log("Methode des Request:", req.method);

    // wir geben bei einer post methode an, wie wir etwas zurück geben wollen:
    res.json({
        success: true
    });
});

// wir können den body des post requests auch auslesen
app.post('/signup', (req, res) =>
{
    // dies können wir teilweise in unserem client machen, um einen body zu senden, müssen wir diesen ja befüllen. Wir klicken auf "Body" und geben dort keys und values in unserem bevorzugten format ein.

    // die daten des bodys bekommen wir unter req.body zurück. wenn wir genau wissen welche daten wir haben wollen, könenn wir diese auch mithilfe des deconstructors direkt auslesen.

    const { firstname, lastname, num } = req.body;

    console.log("Name:", firstname, lastname);

    console.log(num + 50);

    // diese daten können wir an den client zurückgeben:
    res.json({
        success: true, 
        message: `Hallo ${ firstname }, Willkommen an bord!` 
    });
});

// wir sagen express es soll den server starten
app.listen(port, () => console.log("Server hört zu auf port", port));
