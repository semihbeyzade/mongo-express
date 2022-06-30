require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// wir importieren unser modell
const User = require('./models/User.js');

const app = express();
const port = process.env.PORT;
const databaseURL = process.env.DB_URL + "/" + process.env.DB_NAME; // mongodb://localhost:27017/schema-basic
const db = mongoose.connect(databaseURL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// für das schema erstellen wir eine neue post route, da wir dort unser schema ansprechen, wollen wir neue einträge erstellen können:
app.post('/users', (req, res) =>
{
    // wir erstellen eine neue instanz von user:
    const newUser = new User();

    // wir kümmern uns manuell um die neuen daten, so können wir in diersem beispiel besser kontrollieren was wir machen:
    newUser.firstname = "     Max             ";
    newUser.lastname = "Mustermann";
    newUser.id = 1;
    newUser.role = "Admin";
    newUser.birthday = { // wir können direkt daten in ein objekt
        day: 27,
        month: 8,
        year: 1984
    };
    newUser.test = "abc"; // wenn wir einen schlüssel hinzufügen, den wir nicht im schema hinterlegen, wird dieser beim speichern ignoriert.

    // wir speichern unseren eintrag:
    newUser.save((err, user) =>
    {
        // bei einem fehler geben wir die fehlermeldung zurück:
        if(err) throw err;

        // bei erfolg geben wir die angelegten daten zurück:
        res.json(user);
    });
});

app.listen(port, () => {
    console.log('Server läuft auf port', port);
});
