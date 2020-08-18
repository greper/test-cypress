// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../support/creator'

describe('选择组件', () => {
  before(() => {
    cy.login('admin', 'admin')
  })

  createCrudTest({
    cy,
    url: '/demo/form/select',
    doAdd () {
      cy.formItem('单选远程').find('.el-select').click()
      cy.getSelectOptions().first().click()

      cy.formItem('radio').find('.el-radio').first().click()
    },
    checkAdd () {
      cy.checkColValue({ col: 2, value: '打开' })
      cy.checkColValue({ col: 10, value: '打开' })
    },
    doEdit () {
      cy.get('.el-dialog__body  .el-form-item > .el-form-item__label').contains('单选远程').parent().find('.el-select').click()
      cy.get('.el-select-dropdown.el-popper ul li').last().click()

      cy.get('.el-dialog__body  .el-form-item > .el-form-item__label').contains('radio').parent().find('.el-radio').first().click()
    },
    doAfter () {
      cy.get('.d2-crud-header .el-button-group button').contains('根据dict获取字典data').click()
      cy.get('.el-message-box .el-message-box__message').contains('[{"value":"')
      cy.get('.el-message-box .el-message-box__btns button').first().click()
    }
  })
})
