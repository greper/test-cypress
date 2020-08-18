// https://docs.cypress.io/api/introduction/api.html
describe('登录', () => {
  it('测试登录', () => {
    const username = 'admin'
    const password = 'admin'
    cy.visit('/#/login')
    cy.contains('button.button-login', '登录')

    cy.get('input[placeholder="用户名"]')
      .clear()
      .type(username)
      .should('have.value', username)
    // 输入密码
    cy.get('input[placeholder="密码"]')
      .clear()
      .type(password)
      .should('have.value', password)
    // 提交表单
    cy.get('button.button-login').click()

    cy.contains('首页')
  })
})
