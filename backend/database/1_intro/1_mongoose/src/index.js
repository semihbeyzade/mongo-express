// Mehr informationen zu mongoose: mongoosejs.com

// wir importieren mongoose:
const mongoose = require('mongoose');

// wir erstellen eine variable, in der wir die URL unseres mongodb servers, und die datenbank die wir ansprechen wollen, angeben.
// mongodb nutzt standardmaßig das protokoll mongodb und den port "27017".
const databaseURL = 'mongodb://localhost:27017/intro';

/*
    in produktion, ist dies meinst wie folgt in der .env hinterlegt:
    DB_URL=mongodb://localhost:27017/
    DB_NAME=intro
*/

// wir nutzen die methode .connect(); um unsere datenbank mit mongoose anzusprechen, uns also zu ihr zu verbinden, und geben dann noch ein paar optionen mit an.

mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });

// wir erstellen eine weitere variable, in der wir das verbindungsobjekt speichern, indem wir uns die aktive verbindung mit dem attribut .connection; holen:
const db = mongoose.connection;

// dieses objekt ist nicht nur für all unsere datenbank behandlungen verantwortlich, sondern bietet uns auch eine menge interessanter informationen:
// console.log(db);

// mongoose stellt uns einige events zur verfügung, mit denen wir bestimmte aktionen in der datenbank prüfen können:

// mit dem "error" event des db objektes können wir verbindungsfehler abfangen, da mongoose die verbidung aber ein paar mal versucht herzustellen, müssen wir ein wenig warten, bis wir den fehler sehen. Wenn wir zum test die adresse verändern würden.

// wir binden die konsole direkt an das error event und könenn so den callback direkt nutzen:
db.on('error', console.error.bind(console, 'Verbindungsfehler!'));

// wir können events sowohl mit "on", wenn sie auftreten, ausführen, oder mit "once", wenn wir das event nur einmal abfeuern wollen, dies macht vor allem sinn, beim öffnen von verbindungen, da wir dann direkt sehen, das wir erfolgreich mit mongodb verbunden wurden:
db.once('open', () =>
{
    console.log('Wir sind mit MongoDB verbunden');
});

// ----- ab hier arbeiten wir MIT MONGOOSE:

// um ein schema zu erstellen, nutzen wir die methode .Schema(); von mongoose, auf einer neuen variable und fügen unsere informationen als objekt ein, auf dem wir alle schlüssel jeweils mit den namen der information und als wert für jeweils den datentypen angeben. Optional können wir auch angeben, das bestimmte informationen zum beispiel "unique" also nur einmal existieren dürfen, oder "required", also benötigt sind.

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    availible: Boolean,

    // wir geben noch an, das wir eine unique ID haben wollen, und das diese immer mit angegeben werden muss, wenn wir dies tun, müssen wir den datentyp unter "type" mitgeben.
    //    Datentype     Einzelstück   Benötigt
    id: { type: String, unique: true, required: true },

    // Ein erstellungsdatum des eintrags können wir auch hinterlegen, dafür geben wir einfach das aktuelle datum als default an:
    created: { type: Date, default: new Date() }
});

// jetzt nutzen wir dieses schema, um ein modell daraus zu erschaffen, dazu nutzen wir die methode .model();

// wir geben als erste den namen an, den wir für unser jeweiliges modell nutzen wollen, dann geben wir das schema an, das wir eben erstellt haben, und dann die kollektion, in der wir das modell speichern wollen.

// Sollte die kollektion nicht existieren, wird sie jetzt automatisch angelegt:
//                          name,   schema,     kollektion
const Book = mongoose.model('Book', bookSchema, 'books');

// wir können jetzt in unserer datenbankanwendung sehen, das die datenbank, und die kollektion, existieren, da mongoose sie automatisch erstellt hat.

// wenn wir jetzt einen neuen eintrag erstellen wollen, können wir dies machen, in dem wir eine neue instanz von dem modell "Book" anlegen, und sie dann mit unseren informationen füllen:
const newBook = new Book({
    title: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    price: 15,
    availible: true,
    id: 1
});

// created geben wir nicht mit an, da der default wert automatisch eingetragen wird.

// wir können das neue buch ausgeben, dieses wurde allerdings noch nicht gespeichert:
// console.log(newBook);

// INFO: um die folgenden verschiedenen befehle asynchron auszuführen, und sicherzugehen, das die befehle in der richtigen reihenfolge ausgeführt werden, nutzen wir im beispiele eine asynchrone funktion. In express können wir später alles anhand von routen aufrufen und brauchen diese art uns weise NICHT zu schreiben.

const run = async () =>
{
    // wir haben jetzt eine instanz unseres Book models erstellt, also ein neues buch, aber dieses noch nicht in unserer Datenbank gespeichert.

    // um das dokument zu speichern, nutzen wir die mongoose methode .save();. Beim ausführen dieser methode speichert mongoose das dokument und liefert uns ein callback zurück. In diesem Callback können wir fehler und die informationen des dokumentes verwenden, dies ist hilfreich, wenn wir dem nutzer einer api zum beispiel mitteilen wollen, was er getan hat.

    // newBook.save((err, book) =>
    // {
    // if(err) throw err;
    // console.log(`${ book.title } von ${ book.author } wurde gespeichert`);
    // });

    // await newBook.save()
    // .then(book =>
    // {
    //     console.log(`${ book.title } von ${ book.author } wurde gespeichert!`);
    // })
    // .catch(err =>
    // {
    //     throw err;
    // });

    // wenn wir jetzt das program ausführen, sehen wir dass das dokument mit dem buch gespeichert wurde, inklusive des datums, der mongodb internen id und der aktuellen version des dokumentes, 0. Wenn wir daten überschreiben würden, legt mongodb eine neue version des dokumentes an.

    // wenn wir noch einmal versuchen dieses dokument zu speichern, bekommen wir einen fehler, dieser sagt uns nicht nur welchen fehler es gab, sondern auch wo er auftrat. Wie wir sehen, haben wir gesagt "id" muss unique sein, weswegen wir jetzt einen fehler bekommen, denn wir speichern wieder mit der id "1".

    // Wenn wir dokumente löschen wollen, gibt es dafür ein paar befehle, wir nutzen den model befehl .deleteOne(); um das angelegte dokument zu löschen:
    await Book.deleteOne({ title: "The Hound of the Baskervilles"})
    .then(console.log("Buch wurde gelöscht"))
    .catch(err => { throw err });

    // Wir können mit mongoose, wie in der mongoshell auch mehrere andere befehle ausführen, wie zum beispiel mehrere dokumente auf einmal hinzuzufügen. Dafür erstellen wir ein array mit mehreren büchern:
    const newBooks = 
    [
        {
            title: "Casino Royale",
            author: "Ian Flemming",
            price: 10,
            availible: false,
            id: 1
        },
        {
            title: "Illusions",
            author: "Richard Bach",
            price: 12,
            availible: true,
            id: 2
        }
    ];

    // mit der methode .insertMany(); aus der instanz unseres Book modells, fügen wir nun das array ein:
    // await Book.insertMany(newBooks)
    // .then(() => console.log("Bücher hinzufügt"))
    // .catch((err) => { throw err });

    // wie wir sehen, wurden beide dokumente hinzugefügt.

    // mit mongoose können wir aus unserer app heraus auch komplette kollektionen oder datenbanken "droppen", also löschen.

    // alle dokumente innerhalb einer kollektion löschen wir mit:
    // await Book.collection.drop();

    // eine kollektion löschen wir mit:
    // await db.dropCollection('books')
    // .then(console.log("Kollektion gelöscht"))
    // .catch(err => console.log(err));

    // Da eine lehre datenbank, oder kollektion nicht angezeigt wird, können wir das aktuell alles eher schwer testen.

    // Eine komplette datenbank löschen wir mit der methode .dropDatabase();, wir bekommen einen fehler wenn die datenbank sowieso nicht mehr existiert.
    // await db.dropDatabase('intro')
    // .then(console.log("Datenbank gelöscht"))
    // .catch(err => { throw err });

    // um die verbindung zu mongodb zu schließen, nutzen wir den .close(); befehl.
    await mongoose.connection.close();
}

run();
