// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  before(() => {
    cy.login()
    cy.log('整个describe运行前运行一次')
  })
  beforeEach(() => {
    cy.log('每个it之前都会执行')
  })

  it('Visits the app root url', () => {
    cy.login('admin', 'admin')
  })

  afterEach(() => {
    cy.log('每个it之后都会执行')
  })
  after(() => {
    cy.login()
    cy.log('整个describe运行完成后运行一次')
  })
})
