console.log("Hello World");

//Function Definition or Declaration with function signature
function add(a, b)  //function signature line
{ //function body starts here
    return a + b;
} //function body ends here

// console.log(add(10, 20));

function add() {
    var a = parseInt(document.getElementById("no1").value);
    var b = parseInt(document.getElementById("no2").value);
    console.log(a + b);
    document.getElementById("result").innerHTML = a + b;
    return a + b;
}


const myPromise = new Promise((resolve, reject) => {
    let success = false;
    if (success) {
        resolve("Success");
    } else {
        reject("Error");
    }
});

myPromise.then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runProcess() {
    console.log("Start");
    await delay(20000); // Pauses here for 2 seconds
    console.log("End (after 2 seconds)");
}

runProcess();


async function getUser() {
    try {
        // 1. Make the request
        const response = await fetch('https://jsonplaceholder.typicode1.com/users/1');

        // 2. Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 3. Parse the JSON body
        const data = await response.json();
        console.log("User Name:", data.name);
        console.log("Object received is:", data);

    } catch (error) {
        console.error("Could not fetch user:", error);
    }
}

getUser();

