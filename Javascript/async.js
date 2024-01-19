/**
 *  1. JS is Synchronous and Single Threaded --> if we run native JS code given in ECMA Script
 * 
 *  2. JAVA is multithreaded so we can perform asynchronous tasks in JAVA natively
 *      But the mechanism to perform asynchrnous programming with JS is completely different
 * 
 *  3. JS code needs a runtime to execute our code, runtime -- Browser, node -- browser basically provides a runtime for JS
 * 
 *  4. Runtime provides all the features and functionalities to JS, eg. setTimeout(), getElementById() all these functions are not native to JS.
 *       They are provided by the browser.
 * 
 *  5. Event loop is an infinite loop which keeps on checking if the call stack is empty and no global piece of code is left, 
 *      then it pushes the function in event queue to call stack
 * 
 *  6. Runtime tasks are of lower priority as compared to synchronous code of JS
 * 
 *  7. Due to the presence of a runtime and event queue and event loop, JS become non blocking for runtime features.
 *      NOTE: It is still blocking for native synchrnous features like long loops and recursion
 * 
 *  8. setTimeout() is an asynchronous function but the callback of setTimeout is still a synchronous function and it gets executed normally and is a blocking code.
 * 
 *  9. Because the setTimeout() inside timeConsumingByRuntimeFeature2() has is a 0sec timer 
 *      the callback of this setTimeout() i.e exec2() immediately gets pushed to the event queue but not to the call stack for execution 
 *      because some global piece of code is still left
 * 
 *  10. setInterval() returns a value which is dependent on the runtime - browser: number, node: object
 */


function timeConsumingByLoops(){
    console.log("Loop Starts");
    for ( let i = 0 ; i < 5000000000 ; i++ ){
        // some task
    }
    console.log("loop ends");
}

function timeConsumingByRuntimeFeature1(){
    console.log("Starting timer1");
    setTimeout( function exec1(){
        console.log("Completed the timer1");
    }, 1000); // 5sec timer
}

function timeConsumingByRuntimeFeature2(){
    console.log("Starting Timer2");
    setTimeout ( function exec2(){
        console.log("Complegted the timer2");
    },0);  
}

function timeConsumingByRuntimeFeature3(){
    console.log("Starting Timer3");
    setTimeout ( function exec3(){
        console.log("Complegted the timer3");
        for ( let i = 0 ; i < 5000000000 ; i++ ){
            // some task
        }
    },200);
}

console.log("Hi");
timeConsumingByLoops();
timeConsumingByRuntimeFeature1();

timeConsumingByRuntimeFeature2();
timeConsumingByRuntimeFeature3();
timeConsumingByLoops();
console.log("Bye");


// SET INTERVAL
