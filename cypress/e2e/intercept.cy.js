/// <reference types="cypress" />

const { email, senha } = require('../fixtures/data.json')
const { homePage } = require("../support/pages/home.page.js");

describe('Teste de Autenticação', () => {
  beforeEach(() => {
    cy.login(email, senha)
  })

  // Mostrar as categorias visiveis
  it('categories should be visible', () => {
    cy.intercept('GET', '**/public/getCategories', { fixture: 'categories.json' }).as('getCategories')
    homePage.openSearchProduct()
    homePage.openCategoriesFilter()
    homePage.categories().should('have.length.greaterThan', 1)
  })

  // Categorias devem apresentar vazias
  it('categories should be empty', () => {
    cy.intercept('GET', '**/public/getCategories', { fixture: 'noCategories.json' }).as('getCategoriesEmpty')
    homePage.openSearchProduct()
    homePage.openCategoriesFilter()
    homePage.categories().should('have.length', 1)
  })

  // Status code deve ser 500 ( ERROR )
  it('categories should be empty with error', () => {
    cy.intercept('GET', '**/public/getCategories', { statusCode: 500 }).as('getCategoriesError')
    homePage.openSearchProduct()
    homePage.openCategoriesFilter()
    homePage.categories().should('have.length', 1)
  })
})