/**
 *  0. Problems with callbacks :- (i) Inversion of Control (ii) Callback Hell
 * 
 *  1. Due to callbacks i am passing the control of how and when my cb() function should be called to doTask() function 
 *      which is not in my control
 * 
 *  2. If someday Team A decides to change the implementation of doTask() i will be the one to suffer as they are responsible 
 *      for handling my callbacks
 * 
 *  3. Promises are a solution for inversion of control not callback hell because promises too have a similar problem called promise hell
 */

function doTask( val, callback ){
    // whole implementation is done by Team A
    callback(val*val);
}

// Team B uses the doTask() function by passing the callback function
doTask( 9, function cb (num){
    console.log( "The value of num is: ", num );
});
