/* UI Elements */
const phraseDiv = document.getElementById("phraseDiv");
const btn = document.getElementById("startRecognizeOnceAsyncButton");
const lang = document.getElementById('lang');
const mainContent = document.getElementById('mainContent');
const form = document.getElementById('bing');
const resultsContainer = document.getElementById('results');
const template = document.getElementById('template').innerHTML;

/* Constants */
const ENTER_KEY = 13;

/* Services */
const bingSearch = new BingSearch(env.bingSearchKey);
const speechRecognizer = new SpeechRecognizer(env.speechKey, env.speechRegion);

/* Demo App */
function main() {
  btn.addEventListener("click", startVoiceSearch);
  phraseDiv.addEventListener('keydown', startTypingSearch);
}

function startTypingSearch(e) {
  resultsContainer.innerHTML = '';
  let selectedLanguage = lang[lang.selectedIndex].value;
  if (e.keyCode == ENTER_KEY) {
    resultsContainer.innerHTML = '';
    performBingSearch(phraseDiv.value, selectedLanguage);
  }
}

function startVoiceSearch() {
  phraseDiv.value = "";
  resultsContainer.innerHTML = '';
  btn.classList.add('red');
  let selectedLanguage = lang[lang.selectedIndex].value;

  speechRecognizer.Recognize(selectedLanguage, (s, e) => {
    let word = e.result.text;
    phraseDiv.value = word;
  })
  .then(async function (result) {
    btn.classList.remove('red');
    performBingSearch(phraseDiv.value, selectedLanguage);
  });
}

function createSnippetFromTemplate(item) {
  return template.replace("{{name}}", item.name).replace("{{snippet}}", item.snippet).replace("{{url}}", item.url)
}

function performBingSearch(searchTerm, selectedLanguage) {
  mainContent.classList.add('hidden');
  bingSearch.Search(searchTerm, selectedLanguage)
    .then(function (results) {
      resultsContainer.classList.remove("hidden");
      resultsContainer.innerHTML = results.reduce(function (accum, item) {
        return accum + createSnippetFromTemplate(item);
      }, '');;
    });
}

document.addEventListener("DOMContentLoaded", main);
