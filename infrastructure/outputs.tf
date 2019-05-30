output "speech-service-key" {
  value = "${azurerm_cognitive_account.speechdemo-speech.primary_access_key}"
}
output "speech-service-location" {
  value = "${azurerm_cognitive_account.speechdemo-speech.location}"
}
output "bing-search-key" {
  value = "${azurerm_cognitive_account.speechdemo-bing.primary_access_key}"
}
