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
const audioBtn = document.getElementById("audioBtn");

let audio;

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (!word) return;

    clearUI();
    fetchWord(word);
});

// Fetch dictionary data
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

// Display results
function displayWord(data) {
    results.classList.remove("hidden");

    wordTitle.textContent = data.word;

    // Pronunciation text
    const phoneticText = data.phonetics.find(p => p.text)?.text;
    pronunciation.textContent = phoneticText
        ? `Pronunciation: ${phoneticText}`
        : "";

    // Pronunciation audio
    const audioSource = data.phonetics.find(p => p.audio)?.audio;

    if (audioSource) {
        audio = new Audio(audioSource);
        audioBtn.classList.remove("hidden");
    } else {
        audioBtn.classList.add("hidden");
    }

    const meaning = data.meanings[0];
    partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
    definition.textContent = `Definition: ${meaning.definitions[0].definition}`;

    example.textContent = meaning.definitions[0].example
        ? `Example: "${meaning.definitions[0].example}"`
        : "";

    synonyms.textContent = meaning.definitions[0].synonyms.length
        ? `Synonyms: ${meaning.definitions[0].synonyms.join(", ")}`
        : "";
}

// Play pronunciation audio
audioBtn.addEventListener("click", () => {
    if (audio) {
        audio.play();
    }
});

// Error handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    results.classList.add("hidden");
}

// Clear UI
function clearUI() {
    errorMessage.classList.add("hidden");
    results.classList.add("hidden");
    audioBtn.classList.add("hidden");
}

// Theme toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
