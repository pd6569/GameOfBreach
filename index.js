/**
 * Created by peter on 08/09/2017.
 */

/*****
 *
 * Game of Breach
 *
 * Arrays containing "safe" or "breach" passed into "inspectHospital" function.
 *
 * No breach = safe
 * 1 - 3 breaches = trouble
 * > 3 breaches = urgent inspection
 *
 * 5 test arrays provided (test1 to test5)
 */

/* START TEST ARRAYS */

// no breach = Safe
var test1 = ['safe', 'safe', 'safe', 'safe', 'safe', 'safe', 'safe'];

// breach x 2 = trouble
var test2 = ['safe', 'breach', 'safe', 'safe', 'breach'];

// breach x 4 = urgent inspection
var test3 = ['safe', 'breach', 'safe', 'safe', 'breach', 'safe', 'breach', 'breach'];

// "messy" array breach x 4 = urgent inspection
var test4 = ['safe', 'breach', 'safe', 'safe', 'breach', 'BreACH', 'BREach', 'SafE'];

// Nested "messy" array breach x 17 = urgent inspection
var test5 = ['safe', [[['SAFE', 'breach'], 'SAFE', 'breach'], 'SAFE', 'breach'], ['safE', 'breach', 'SafE', 'BREAch'], 'breach', 'safe', 'safe', 'breach', 'BreACH', 'BREach', 'SafE', [[['SAFE', 'breach'], 'SAFE', 'breach'], 'SAFE', ['SAFE', ['SAFE', 'breach'], 'breach'], 'breach', ['SAFE', ['SAFE', ['SAFE', 'breach'], 'breach'], 'breach']]];

/* END TEST ARRAYS */

// global variable tracking number of breaches
var numBreaches = 0;

// Function called and second parameter set true, as this is first inspection
inspectHospital(test5, true);

/****
 *
 * Single function which takes array of any dimension containing "breach" or "safe" status for each patient.
 * Not case sensitive, but spelling must be correct.
 * E.g. ["breach, "safe", ["breach", ["breach", ["BREach", "SaFe"], "safe"]
 *
 * Does not return a value, but outputs "breach status" to console.
 *
 * @param {Array}   hospitalStats       Array as describe above containing breach/safe info for patients
 * @param {boolean} firstInspection     boolean value indicating if it is first function call/inspection
 *
 */

function inspectHospital(hospitalStats, firstInspection){

    // Start looping through array
    for (var i = 0; i < hospitalStats.length; i++){

        // If an array is encountered as an element of the array being looped through, re-call the function
        // setting firstInspection to false (by simply omitting the parameter)
        if (Array.isArray(hospitalStats[i])){
            inspectHospital(hospitalStats[i])
        }
        // If element in array being looped through is not an array, it must be a string representing "breach" or "safe"
        else {
            // Clean the string: convert to lower case and trim any whitespace
            var safeOrBreach = hospitalStats[i].toLowerCase().trim();

            // increment number of breaches if data is "breach"
            if (safeOrBreach === "breach") numBreaches++;
        }
    }

    // Only output inspection/safety status to console once the final element of the initial array has been reached
    if (firstInspection){
        if (numBreaches > 3){
            return console.log("Urgent Inspection. Hospital breached " + numBreaches + " times");
        } else if (numBreaches >= 1){
            return console.log("Trouble. Hospital breached " + numBreaches + " times");
        } else {
            return console.log("Safe");
        }
    }

}
