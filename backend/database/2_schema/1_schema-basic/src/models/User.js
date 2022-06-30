const { Schema, model } = require('mongoose');

// schemas können eine menge an daten beinhalten, in unserem datenbank client können wir diese daten später auch prüfen.
const schema = new Schema({
    // wir wollen den vornamen unseres users als STRING angeben, hierfür müssen wir den datentyp string definieren:
    firstname: { type: String, trim: true },
    // wir können mit der option "trim" dafür sorgen, das vor und nach dem string leerzeichen automatisch gelöscht werden.

    // für die typendeklaration ohne optionen gibt es einen shorthand befehl, indem wir den typen einfach direkt eingeben:
    lastname: String, // gleich wie 

    // wir wollen das es einen wer gibt, den jeder user nur einmal selbst besitzt, also ein "unique" wert, der nur einmal pro kollektion auftreten kann. Der default von unique ist false.
    id: { type: String, unique: true },

    // wir können auch default werte eintragen, diese werden dann automatisch gespeichert, wenn wir keine daten eingeben:
    role: { type: String, default: "Member" },

    // wir können hier auch objekte mit daten verwenden:
    birthday:
    {
        day: Number,
        month: Number,
        year: { type: Number } // auch die längere schreibweise, mit oder ohne optionen funktioniert innerhalb des objektes.
    }

}, {
    // in einem weiteren objekt, gefolgt von unseren datendeklarationen, können wir optionen hinterlegen:
    strict: true,
    timestamps: true // wir können automatisch timestamps hinterlegen, diese werden angelegt, wenn das dokument erstellt wird (createdAt) und wenn das dokument veränder wird (updatedAt)
})
.post('save', (doc) =>
{
    // schemen besitzen auch events, die wir nach dem ausführen, oder vor dem ausführen einer aktion abfeuern können, zum beispiel können wir etwas direkt nach dem speichern ausführen:
    console.log(doc);
});

// wir erstellen ein modell, anhand der daten des schemas:
//                      model name, schema, kollektion
const userModel = new model("User", schema, "users");

// wir exportieren das model:
module.exports = userModel;
