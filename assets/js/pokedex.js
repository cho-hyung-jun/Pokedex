let currentId = 1;

const addZeros = numStr => {
    numStr = numStr.toString();
    while (numStr.length < 3) {
        numStr = "0" + numStr;
    }
    return numStr;
}

const getPokemonData = pokemon => {
    id.textContent = "";
    document.querySelector("#name").textContent = "";
    weight.textContent = "";
    height.textContent = "";
    sprite.src = "./assets/images/transferring.gif";

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            createPokemonDisplay(response);
        }
    })

    xhr.send(null);
}

const createPokemonDisplay = data => {
    currentId = data.id;
    nameInput.value = "";

    id.textContent = addZeros(data.id);
    console.log(addZeros(data.id));
    document.querySelector("#name").textContent = data.name;
    weight.textContent = data.weight / 10;
    height.textContent = data.height / 10;
    sprite.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default ?? data.sprites.front_default;


    const display = document.querySelector(".display");

}

const getPokemonSpecies = pokemon => {
    description.innerHTML = "<div class='loading'></div>";
    genus.textContent = "";
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            displayDescription(response);
        } else if (xhr.readyState === xhr.DONE) {
            descriptionError();
        }
    })

    xhr.send(null);
}

const displayDescription = data => {
    if (data.flavor_text_entries.length > 0) {
        description.textContent = data.flavor_text_entries[0].flavor_text.replace("\f", " ");

        for (let object of data.flavor_text_entries) {
            if (object.language.name === "en") {
                description.textContent = object.flavor_text.replace("\f", " ");
                break;
            }
        }
    } else {
        description.textContent = "No description in Pokedex.";
    }
    for (let object of data.genera) {
        if (object.language.name === "en") {
            genus.textContent = object.genus.slice(0, -8);
            break;
        }
    }
}

const descriptionError = () => {
    description.innerHTML = `Error!<br>Pokemon not found`;
}

nameInput.addEventListener('keyup', function (e) {
    if (e.key === "Enter") {
        getPokemonData(e.target.value.toLowerCase());
        getPokemonSpecies(e.target.value.toLowerCase());
    }
})

const leftBtn = document.querySelector(".direction-pad .left");
const rightBtn = document.querySelector(".direction-pad .right");

leftBtn.addEventListener('click', function () {
    if (currentId > 1) {
        currentId--;
        getPokemonData(currentId);
        getPokemonSpecies(currentId);
    }
});

rightBtn.addEventListener('click', function () {
    if (currentId < 1010) {
        currentId++;
        getPokemonData(currentId);
        getPokemonSpecies(currentId);
    }
});

document.addEventListener('keyup', function (e) {
    if (e.key === "ArrowLeft") {
        currentId--;
        getPokemonData(currentId);
        getPokemonSpecies(currentId);
    } else if (e.key === "ArrowRight") {
        currentId++;
        getPokemonData(currentId);
        getPokemonSpecies(currentId);
    }
})

getPokemonData(1);
getPokemonSpecies(1);