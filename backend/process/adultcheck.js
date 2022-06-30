const [ node, script, ...args ] = process.argv;

// args[0] = Alter
// args[1] = Name

//             node programm      werte 
// ausführung: node adultcheck.js 25 Frederik

// Wenn "ALTER" größer als 18
if(args[0] > 18)
{
    //                    ... wenn "NAME" nicht angegeben, dann "Mein Freund", sonst wert von "NAME":
    console.log(`Hallo ${ args[1] !== undefined ? args[1] : "Mein Freund" }, Du bist alt genug!`);
}
else
{
    console.log(`Hallo ${ args[1] !== undefined ? args[1] : "Mein Freund" }, Du bist leider zu jung!`);
}