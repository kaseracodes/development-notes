/**
 *  1. Promises --> Readability Enhancers and also help us solve the problem of inversion of control as in callbacks
 * 
 *  2. In JS promises are special type of objects that get returned immediately when we call them
 * 
 *  3. Promises act as a placeholder for the data we hope to get back sometime in future
 * 
 *  4. x = fetch("https://www.xyz.com")  -->  suppose fetch() is a runtime fucntion which downloads the data present at the given url
 *      Now fetch() is a asynchronous runtime function which is time consuming (downloading data from the server might take time) so JS is 
 *      not going to wait for it to download and will handle it asynchronously by notifying the runtime about the function where it keeps on
 *      getting executed in the background and JS continues its normal synchrnous flow
 * 
 *  5. Now if fetch() was implemented using promises then fetch() will immediately return a promise object whose value will be stored in x.
 *      The promise object is not the actual data that was downloaded (which might take time) but instead acts as a PLACEHOLDER for the data
 *      we will get back in the future, once the asynchronous task is completed
 * 
 *  6. In these promise objects we can attach functionality we want to execute once the future task is done. For eg. we might want to 
 *      display the file once it is downloaded. So the task of displaying the data can only take place after it is downlaoded
 * 
 *  7. Once the future task is done, promises will automatically execute the attached functionality
 * 
 *  8. Prmosises are native to JS. Thus creation of a promise is synchronous in nature. NOTE: 'returned immediately' : as synchrnous
 * 
 *  9. CREATING A PROMISE:- 
 *  
 *      function creatingPromise(){
 *          return new Promise( function executor (resolve, reject){
 *              
 *          });
 *      }
 * 
 *  10. The constructor of the Promise object, expects a callback function (executor() function). This executor function is called inside
 *       the constructor body of the Promise object. The executor() is called synchronously. 
 * 
 *  11. Now this executor() function is a HOF too. Whenever it is called inside the contructor it is called by passing two functions - resolve and reject
 * 
 *  12. Now the function creatingPromise() will return a promise object as soon as the promise object gets created.
 * 
 *  13. The promise object will be created when its constructor runs successfully. The constructor calls the executor function inside its body.
 *      So the constructor will run successfully when the executor() function completes its execution.
 * 
 *  14. So the function creatingPromise() will return a promise the promise object as soon as the executor() function completes.
 * 
 *  15. We can write a synchronous/ asynchronous code inside the executor() function as we wish.
 * 
 *  16. If we write a synchrnous code, until it gets executed our promise wont be returned.
 * 
 *  17. But if we write an asynchrnous code inside the executor function, for eg. setTimeout(), 
 *      JS will notify the runtime about it where its timer starts processing, 
 *      and will immediately comeback and immediately return our promise object.
 * 
 *  18. So the promise object is now in pending state.
 * 
 *  19. Once the timer of the setTimeout() completes, the callback function given to it is pushed to the event queue and 
 *      when the call stack gets empty it is pushed to the call stack where the execution of the callback function, given to the setTimeout(), begins executing.
 * 
 *  20. The promise object does not keep on waiting for this callback to get executed. It gets returned immediately with a state 'pending'.
 * 
 *  21. Now the callback function is responsible for changing the state of our promise object. The state can be either changed to 'fullfilled' 
 *      or to 'rejected'. The resolve() changes the state of our promise from 'pending' to 'fullfilled' and reject() changes 
 *      the state of our promise from 'pending' to 'rejected'. It is our responsibility to change the state of the promise inside the callback function
 * 
 *  22. The state of a promise can be changed only once. Multiple resolve() or reject() function calls are ignored.
 * 
 *  23. NOTE: The state of the promise is changed inside the callback function and callback function is execued when it is pushed to the callstack
 *            And when will the callback function be pushed to call stack depends on when the callstack gets empty. So 
 *            the state of the promise will change when the callstack gets empty
 * 
 *  24. Toh promise object pehle hi return ho jaayega with 'pending' state aur executor() function ke andar jo setTimeout() hai, 
 *      uska callback jab run hoga to wo promise ka state change kardega to either 'fullfilled' or 'rejected' by calling resolv() or rejected()
 * 
 *  25. Whatever argument we call, resolve or reject with, it gets assigned to the value property of the Promise object.
 * 
 */

function getRandomInt (max) {
    return Math.floor (Math. random() * max);
}

function createPromiseWithLoop(){
    return new Promise(function executor(resolve, reject) {
        console.log("loop inside first function starting");
        for ( let i = 0 ; i < 5e9 ; i++ ){};
        console.log("loop inside first function ended");
        let num = getRandomInt(10);
        if (num % 2 == 0){
            // if the random number is even we fullfill
            resolve (num);
        } 
        else{
            // if the random number is odd we reject
            reject (num);
        }
    });
}

function createPromiseWithTimeout(){
    return new Promise(function executor(resolve, reject) {
        console.log("timer inside setTimeout starting");
        setTimeout(function cb() {
            console.log("callback function given to the setTimeout is pushed to the call stack");
            let num = getRandomInt(10);
            if (num % 2 == 0){
                // if the random number is even we fullfill
                resolve (num);
            } 
            else{
                // if the random number is odd we reject
                reject (num);
            }
        }, 3000);
    });
}

console.log("Program starting");
let x = createPromiseWithLoop();
console.log(x);
let y = createPromiseWithTimeout();
console.log(y)

console.log("outer loop starting");
for ( let i = 0 ; i < 5e9 ; i++ ){}; // after this loop gets executed only then the function cb() gets pushed to call stack
console.log("outer loop finished");
console.log(y);