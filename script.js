const form = document.getElementById("searchForm");
const input = document.getElementById("wordInput");
const results = document.getElementById("results");
const errorMessage = document.getElementById("errorMessage");

const wordTitle = document.getElementById("wordTitle");
const pronunciation = document.getElementById("pronunciation");
const partOfSpeech = document.getElementById("partOfSpeech");
const definition = document.getElementById("definition");
const example = document.getElementById("example");
const synonyms = document.getElementById("synonyms");

const themeToggle = document.getElementById("themeToggle");

// API endpoint
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Handle form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (!word) return;

    clearUI();
    fetchWord(word);
});

// Fetch word data
async function fetchWord(word) {
    try {
        const response = await fetch(API_URL + word);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();
        displayWord(data[0]);
    } catch (error) {
        showError(error.message);
    }
}

// Display word details
function displayWord(data) {
    results.classList.remove("hidden");

    wordTitle.textContent = data.word;

    pronunciation.textContent =
        data.phonetics[0]?.text
            ? `Pronunciation: ${data.phonetics[0].text}`
            : "";

    const meaning = data.meanings[0];
    partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
    definition.textContent = `Definition: ${meaning.definitions[0].definition}`;

    example.textContent =
        meaning.definitions[0].example
            ? `Example: "${meaning.definitions[0].example}"`
            : "";

    synonyms.textContent =
        meaning.definitions[0].synonyms.length > 0
            ? `Synonyms: ${meaning.definitions[0].synonyms.join(", ")}`
            : "";
}

// Error handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    results.classList.add("hidden");
}

// Clear previous results
function clearUI() {
    errorMessage.classList.add("hidden");
    results.classList.add("hidden");
}

// Theme toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
