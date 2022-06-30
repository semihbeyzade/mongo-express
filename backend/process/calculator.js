
// ich habe eingegeben: node calculator.js sum 1 2 3 4

// Wir holen uns die arguemente aus der process.argv; heraus:
const [ node, scripts, ...args ] = process.argv;

// wir holen uns den kalkulationstyp und die nummern dynamisch als spread operator aus args:
const [ calcType, ...numbers ] = args;

// calcType = "sum";
// numbers = [ "1", "2", "3" ];

// wir erstellen eine variable fürs ergebnis, und eine für den error state.
let result = 0;
let error = false;

// wir erstellen eine funktion um die Summe zu bekommen:
const sum = (numArr) =>
{
    let arrResult = 0;

    numArr.forEach(num =>
    {
        arrResult += Number(num);
    });

    return arrResult;
}

// Wir erstellen eine methode um den durchschnitt zu bekommen:
const avg = (numArr) =>
{
    return sum(numArr) / numArr.length;
}

// Wir nutzen einen switch um anzugeben, welchen kalkulationstyp wir nutzen, mit einem default für eine fehlerhafte eingabe:
switch(calcType)
{
    case "sum":
        result = sum(numbers);
        break;
    case "avg":
        result = avg(numbers);
        break;
    case "pi":
        result = 3.14;
        break;
    default:
        error = true;
        console.log("Fehler: Kann nicht berechnen.");
        break;
}

// wir geben, falls kein fehler auftrat, das ergebnis aus:
error === false && console.log("Ergebnis:", result);
