const BingSearch = (function () {
  function BingSearch(key) {
    this.subscriptionKey = key;
  }

  function performGet(query,language){
    let request = new XMLHttpRequest();
    let queryurl = "https://api.cognitive.microsoft.com/bing/v7.0/search?q=" + encodeURIComponent(query) + "&" + bingSearchOptions(language);
  
    return new Promise( (resolve,reject) => {

      request.onreadystatechange = function () {
        if (request.readyState !== 4) return;
        if (request.status >= 200 && request.status < 300) {
          resolve(request);
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          });
        }
      };
  
      request.open("GET", queryurl); 
      request.setRequestHeader("Ocp-Apim-Subscription-Key", this.subscriptionKey);
      request.setRequestHeader("Accept", "application/json");
      request.addEventListener("error", function () {
        reject("Error completing request");
      });
  
      request.addEventListener("abort", function () {
        reject("Request aborted");
      });
  
      request.send();
    });
  }

  BingSearch.prototype.Search = async function (query, language) {
    if (!query.trim().length) return false;
    return new Promise( async(resolve,reject)=>{
      let get = performGet.bind(this);
      let response = await get(query,language);
      let searchResults = await handleBingResponse(response);
      resolve(searchResults);
    });
  };

  function bingSearchOptions(language) {
    var options = [];
    options.push(`mkt=${language}`);
    options.push(`SafeSearch=strict`);
    options.push(`freshness=month`);
    options.push(`promote=webpages`);
    options.push(`answerCount=9`);
    options.push(`count=25`);
    options.push(`offset=0`);
    options.push(`textDecorations=true`);
    options.push(`textFormat=HTML`);
    return options.join(`&`);
  }

  function handleBingResponse(response) {
    return new Promise( (resolve,reject)=> {
      var json = response.responseText.trim();
      var jsobj = {};
  
      try {
        if (json.length) jsobj = JSON.parse(json);
      } catch (e) {
        console.log("Invalid JSON response");
        return;
      }
  
      if (json.length) {
        if (jsobj._type === "SearchResponse" && "rankingResponse" in jsobj) {
          resolve(jsobj.webPages.value);
        } else {
          reject("No search results in JSON response");
        }
      } else {
        reject("Empty response (are you sending too many requests too quickly?)");
      }
    }); 
  }

  return BingSearch;
}());


