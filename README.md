# Azure Speech SDK Web (HTML) Demo

This project is a demonstration of implementing a voice based search. Users can click a microphone button and speak their queries, which will launch an Bing Search and render the results on the page.

Note: Users can also type queries into the search box, but the focus of this demo is implementing voice search.

### Multi Language Support

The current demo supports 3 languages, English (US), Arabic (EG) & Spanish (MX). The full list of languages available can be found [here](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support).


### Requirements
* [NodeJs](https://nodejs.org/en/)
* [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
* [Terraform](https://www.terraform.io/downloads.html) 

### Create the infrastructure needed.
This demo relies on two Azure services, [Azure Speech SDK](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-sdk) & [Bing Search](https://azure.microsoft.com/en-us/services/cognitive-services/bing-web-search-api/). Both require an Azure Subscription and keys set up. You can create an [Azure Free Account](https://azure.microsoft.com/en-us/free/) to try this demo.

### Infrastructure
The infrastructure folder contains terraform files that can be used to spin up the two cognitive services used by this project. Azure Speech Service and Bing Search v.7.

* Ensure that Terraform and the Azure CLI tools are installed locally or use the [Azure Cloud Shell](https://shell.azure.com) (the cloud shell installs these tools by default.)
* (if local) invoke ```az login``
* Navigate to the infrastructure repo of this folder.
* run ``` terraform init ``` to initialize terraform 
* run ``` terraform plan --out=plan.tfplan ``` 
* run ``` terraform apply "plan.tfplan" ```

Note the output values, you will be provided with the keys for Speech Service and Bing Search and the Speech Service region.

* In the js folder of this repo, create a file called env.js with the following structure
```
let env = {
  speechKey : "<SPEECH_SERVICE_KEY>",
  speechRegion: '<REGION_OF_COGNITIVE_SEARCH>',
  language: 'en-US',
  bingSearchKey: '<BING_SEARCH_KEY>'
}
```

Note: This method is not very secure in that secrets are exposed via env.js directly. A much better approach would be to set up authentication/authorization and include endpoints to retreive those value for secure users. For simplicity of this demo we are using env.js but it is NOT RECOMMENDED to use this in a production capacity.


### Running the Demo
* Clone the repo.
* ``` npm install ```
* ``` npm start ```
* Open your preferred browser and naviate to http://localhost:8080/index.html

### References

* [Speech Service Documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/)
* [Azure Speech SDK - JS Quickstart](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/quickstart-js-browser)
* [Azure Speech Service Language Support](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support)
* [Bing Web Search Example](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/tree/master/Tutorials/Bing-Web-Search/public)

