param environmentName string
param environmentType string
param location string
param sqlAdministratorLogin string
@secure()
param sqlAdministratorPassword string
param tags object = {}

module webAppPattern 'br:advaniabicepregistry.azurecr.io/webappdoc:v1.0' = {
  scope: resourceGroup()
  name: 'webapp-pattern-deployment'
  params:{
    baseName: 'advaniabicep'
    environment: 'dev'
    location: 'northeurope'
    planSku: 'S1'
    appSettings: {
      "
    }
  }
}

output webAppUrl string = webAppPattern.outputs.webAppHostName
