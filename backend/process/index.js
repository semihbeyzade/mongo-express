// wir können in nodejs bestimmte informationen von außen in unsere applikation speisen, dabei hilft uns das "process;" objekt.

// mit process.version; können wir die aktuelle nodejs version in unserer applikation auslesen:
console.log("NodeJS Version:", process.version);

// mit process.release; können wir uns weitere informationen der NodeJS version holen:
console.log("NodeJS Release info:", process.release);

if(process.version !== "17")
{
    console.log("Dieses programm läuft erst ab NodeJS version 17");
}

// mit process.versions; können wir weitere informationen zu den internen dependencies von nodejs holen:
console.log(process.versions);

// mit process.argv; können wir uns den pfad oder die aktuellen datei ausgeben, wenn wir dort nichts anderes mit angeben:
console.log(process.argv);
console.log(process.argv[1]);

// wir können uns process aus direkt ausgeben lassen:
console.log(process);

// process.platform; gibt uns aus, welches betriebssystem wir nutzen:
console.log("OS", process.platform);
console.log(process.arch);

if(process.arch === "x64")
{
    console.log("Dieses programm läuft nur auf 32 bit systemen");
}

console.log("-".repeat(50));

// process.argv; kann genutz werden, um mit dem programm zu interagieren, es agiert dann als schnittstelle zwischen dem terminal, und der applikation. So können wir informationen an die app übergeben, wenn wir sie mit dem programmaufruf schreiben, wie bei sass oder nodemon zum beispiel: "nodemon index.js"

// wir das argv; objekt ausseinandernehmen, könenn wir auf die argumente von der konsole zugreifen, dafür nutzen wir am besten den spread operator, so erstellen wir ein objekt mit unseren inputs:
const [ node, script, ...args ] = process.argv;

console.log({ args });

console.log(process.argv);

if(args[0] === "install" && args[1] === "virus")
{
    console.log("!!!!! INSTALLIERE VIRUS !!!!!");
}
else
{
    console.log("kenne kommando nicht");
}

// divider
console.log("-".repeat(50));

// wir können im backend auch auf umgebungsvariablen zugreifen, und eigene schreiben. Dies ist besonders hilfreich, wenn wir dynamisch in unserem projekt angeben wollen wo zum beispiel der port ist, oder der host, oder geheime passwörter.

// das objekt process.env; gibt uns alle auf dem system gespeicherten umgebungsvariabeln zurück:
console.log(process.env); // die ganze umgebung des systems

// process.env.USERNAME; zum beispiel, gibt uns den benutzernamen auf dem betriebssystem zurück:
console.log("Ich bin:", process.env.USERNAME); // Ich bin: rick

// oder
console.log(process.env.USER); // rick

// process.env.HOME; gibt uns den pfad zum root/home ordner des betriebssystemes wieder:
console.log(process.env.HOME); // /home/rick

// process.env.PWD; gibt uns den aktuellen ordner aus, auf dem das programm läuft:
console.log(process.env.PWD);  // home/user/Dokumente/... 

console.log("-".repeat(50));

// process; kann auch als event emitter eingesetzt werden:
// Das event exit wird ausgeführt, wenn das programm beendet wird, da das aktuelle programm bis zum ende durchläuft und dann automatisch beendet wird, sollten wir also am ende immer unsere konsolen mitteilung sehen, die wir hier angeben:
process.on('exit', code =>
{
    // Der status code 0 bedeutet, "CLEAN EXIT", also "erfolgreicher ausgang", und sagt, das alles super gelaufen ist, und das programm erfolgreich beendet wurde.
    console.log("Beendet mit status code:", code);
});

console.log("LALALALA irgendwas passiert...");


