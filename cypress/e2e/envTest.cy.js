/// <reference types="cypress" />

describe('Environment Variables Test', () => {

  beforeEach(() => {
    cy.setCookie('ebacStoreVersion', Cypress.env("ebacStoreVersion"), { domain: 'lojaebac.ebaconline.art.br' })

    cy.fixture(`${Cypress.env("MY_ENV")}/data.json`).then(data => {
      cy.log(data.email)
    })

  })

  it('Default env', () => {
    cy.log(Cypress.env('MY_ENV'))
    cy.log(Cypress.env('ebacStoreVersion'))

    cy.visit("/")
  })

  it('Config test env', {
    env: {
      MY_ENV: "local"
    }
  }, () => {
    cy.log(Cypress.env('MY_ENV'))
    cy.log(Cypress.env('ebacStoreVersion'))

    cy.visit("/")
  })

})