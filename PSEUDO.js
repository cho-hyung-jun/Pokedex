/*
    JAVASCRIPT
    =================
    1. Call our function when the user 
        clicks the left or right arrows
    2. Also need to call the function
        when the user presses Enter
        in the input
    3. Grab the relevant data, and plug it in
        where it needs to go

    4. Add another AJAX request to the species endpoint

*/

function getPokemonData(pokemon) {
    const xhr = new XMLHttpRequest(); // STEP 1

    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemon}`); // STEP 2

    // STEP 4
    xhr.addEventListener("load", function () {
        console.log(JSON.parse(xhr.responseText));
        // CODE TO DISPLAY POKEMON DATA
    });

    xhr.send(null); // STEP 3
}

getPokemonData(1);

