provider "azurerm" {
  version = "=1.22.0"
  subscription_id = "${var.subscription_id}"
}

resource "azurerm_resource_group" "speechdemo-rg" {
  name     = "${var.resource_group_name}"
  location = "${var.resource_group_location}"
}

resource "azurerm_cognitive_account" "speechdemo-speech" {
  name                = "${azurerm_resource_group.speechdemo-rg.name}speech"
  location            = "${azurerm_resource_group.speechdemo-rg.location}"
  resource_group_name = "${azurerm_resource_group.speechdemo-rg.name}"
  kind                = "SpeechServices"

  sku {
    name = "F0"
    tier = "Free"
  }
}

resource "azurerm_cognitive_account" "speechdemo-bing" {
  name                = "${azurerm_resource_group.speechdemo-rg.name}bing"
  location            = "global"
  resource_group_name = "${azurerm_resource_group.speechdemo-rg.name}"
  kind                = "Bing.Search.v7"

  sku {
    name = "F0"
    tier = "Free"
  }
}
