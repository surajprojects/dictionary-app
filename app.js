const searchWord = document.querySelector("#searchWord");
const btnSearch = document.querySelector("#btnSearch");
const showResult = document.querySelector("#showResult");

async function searchDictionary(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const result = await response.json();
        if (response.ok) {
            displayResult(result);
        }
        else if (response.status === 404) {
            const msg = document.createElement("p");
            msg.textContent = "No result found!!!";
            msg.id = "msgNotFound";
            showResult.textContent = "";
            showResult.appendChild(msg);
        }
    }
    catch (error) {
        console.error("Unable to get data, something went wrong!!!");
    }
};

btnSearch.addEventListener("click", function (e) {
    e.preventDefault();
    let inputWord = searchWord.value;
    if (inputWord.length > 0) {
        searchDictionary(inputWord);
        searchWord.value = "";
    }
});

function displayResult(result) {
    showResult.textContent = "";
    const mainWord = document.createElement("h4");
    mainWord.id = "mainWord";
    mainWord.textContent = result[0].word;
    showResult.appendChild(mainWord);

    const wordPhonetic = document.createElement("h6");
    wordPhonetic.id = "wordPhonetic";
    wordPhonetic.textContent = result[0].phonetics[0].text;
    showResult.appendChild(wordPhonetic);

    const wordNoun = document.createElement("p");
    wordNoun.id = "wordNoun";
    wordNoun.textContent = result[0].meanings[0].partOfSpeech;
    showResult.appendChild(wordNoun);

    const example1 = document.createElement("p");
    example1.id = "example1";
    example1.textContent = `1. ${result[0].meanings[0].definitions[0].definition}`;
    showResult.appendChild(example1);

    const example2 = document.createElement("p");
    example2.id = "example2";
    if (result[0].meanings[0].definitions.length > 1) {
        example2.textContent = `2. ${result[0].meanings[0].definitions[1].definition}`;

    }
    else {
        example2.textContent = "";
    }
    showResult.appendChild(example2);
}