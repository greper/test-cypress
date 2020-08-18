// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username = 'admin', password = 'admin') => {
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
  cy.contains('d2-crud-plus')
})

/**
 * 简单页面测试
 */
Cypress.Commands.add('simpleCrud', context => {
  cy.openMenu(context)
})
/**
 * 打开某个crud页面
 */
Cypress.Commands.add('openCrud', url => {
  cy.visit('/#' + url)
  cy.wait(1000)
})
/**
 * 点击某个菜单
 */
Cypress.Commands.add('openMenu', context => {
  cy.get('.d2-layout-header-aside-menu-side li.el-submenu')
    .contains(context.parentMenu).first()
    .click()
  cy.get('.d2-layout-header-aside-menu-side li.el-menu-item')
    .contains(context.subMenu).first()
    .click({ force: true })
  cy.wait(1000)
  return cy.checkId(context, '1')
})

Cypress.Commands.add('openAdd', context => {
  return cy.get('.d2-container-full__body')
    .contains('新增')
    .click()
})
Cypress.Commands.add('openEdit', context => {
  cy.checkId(context, '1', false)
  if (context.editWait) {
    cy.wait(context.editWait)
  }
  const editForce = context.editForce != null ? context.editForce : false
  return cy.get(
    '.d2-container-full__body .el-table__body-wrapper button i.el-icon-edit'
  )
    .first()
    .click({ force: editForce })
})
Cypress.Commands.add('openView', context => {
  cy.checkId(context, '1', false)
  if (context.viewWait) {
    cy.wait(context.viewWait)
  }
  const viewForce = context.viewForce != null ? context.viewForce : false
  return cy.get(
    '.d2-container-full__body .el-table__body-wrapper button i.el-icon-view'
  )
    .first()
    .click({ force: viewForce })
})
Cypress.Commands.add('closeDialog', context => {
  return cy.get('.el-dialog__footer')
    .contains('确定')
    .click()
})

Cypress.Commands.add('doDelete', context => {
  cy.checkId(context, '1', false)
  if (context.deleteWait) {
    cy.wait(context.deleteWait)
  }
  const deleteForce = context.deleteForce != null ? context.deleteForce : false
  cy.get(
    '.d2-container-full__body .el-table__body-wrapper button i.el-icon-delete'
  )
    .first()
    .click({ force: deleteForce })
  cy.get('.el-message-box__btns')
    .contains('确定')
    .click()
  cy.get('.d2-container-full__body').contains('新增')
  return cy.checkId(context, '1')
})

Cypress.Commands.add('formItem', (label, parentSelect = '.el-dialog__body') => {
  return cy
    .get(parentSelect + ' .el-form-item > .el-form-item__label')
    .contains(label)
    .first()
    .parent()
})

Cypress.Commands.add('searchItem', (label, parentSelect = '.d2p-search-form') => {
  return cy.formItem(label, parentSelect)
})

Cypress.Commands.add('checkId', (context, value, equal = true) => {
  // let idColTitle = context.idColTitle
  // if (idColTitle == null) {
  //   idColTitle = 'ID'
  // }
  // cy.checkColValue({ title: idColTitle, value, equal })

  let idColIndex = context.idColIndex
  if (idColIndex == null) {
    idColIndex = 1
  }
  if (context.listWait) {
    cy.wait(context.listWait)
  }
  return cy.checkColValue({ col: idColIndex, row: context.row, value, equal })
})
/**
 * 检查列的值是否正确
 */
Cypress.Commands.add(
  'checkColValue',
  ({
    title,
    col = 1,
    row = 1,
    value,
    contains,
    equal = true,
    startWith = false,
    wait
  }) => {
    return cy.get(
      '.el-table > .el-table__body-wrapper >  .el-table__body > tbody > :nth-child(' +
      row +
      ') > .el-table_' +
      row +
      '_column_' +
      col +
      ' > .cell'
    ).should(target => {
      const text = target.text().trim()
      if (startWith) {
        if (contains) {
          for (const item of contains) {
            if (text.indexOf(item) === 0) {
              // eslint-disable-next-line no-unused-expressions
              expect(true).to.be.true
              return
            }
          }
          // eslint-disable-next-line no-unused-expressions
          expect(text.indexOf(false) === 0).to.be.true
        } else if (value) {
          // eslint-disable-next-line no-unused-expressions
          expect(text.indexOf(value) === 0).to.be.true
        }
      } else if (equal) {
        expect(text).to.equal(value)
      } else {
        expect(target.text().trim()).to.not.equal(value)
      }
    })
  }
)

Cypress.Commands.add('getCell', ({ title, col = 1, row = 1 }) => {
  return cy.get(
    '.el-table > .el-table__body-wrapper >  .el-table__body> tbody > :nth-child(' +
    row +
    ') > .el-table_' +
    row +
    '_column_' +
    col +
    ' > .cell'
  )
})

Cypress.Commands.add('hideFixedBody', (context, hide = true) => {
  return cy.get('.el-table .el-table__fixed-body-wrapper').then(target => {
    target[0].css('display', hide ? 'none' : 'block')
  })
})

Cypress.Commands.add('checkError', context => {
  return cy.get('.d2-header-right').then($el => {
    $el = $el.find('.el-badge')
    if ($el == null) {
      cy.log('正确，没有异常')
    } else {
      // 点开日志页面
      $el.click()
      cy.wait(1000)
      // eslint-disable-next-line no-unused-expressions
      expect($el).not.exist
    }
  })
})

Cypress.Commands.add('getSelectOptions', () => {
  return cy.get('.el-select-dropdown.el-popper ul li:visible')
})
Cypress.Commands.add('getCascadeOptions', (blockIndex = 1) => {
  cy.wait(50)
  return cy
    .get(
      '.el-popper.el-cascader__dropdown:visible .el-cascader-panel:visible .el-cascader-menu:visible:eq(' +
      (blockIndex - 1) +
      ') .el-cascader-menu__wrap ul li:visible'
    )
})

Cypress.Commands.add('searchClick', () => {
  return cy
    .get('.d2p-search-form')
    .contains('查询')
    .click()
})

Cypress.Commands.add(
  'attachFile',
  {
    prevSubject: 'element'
  },
  (input, fileName, fileType) => {
    return cy.fixture(fileName)
      .then(content => Cypress.Blob.base64StringToBlob(content, fileType))
      .then(blob => {
        const testFile = new File([blob], fileName, { type: fileType })
        const dataTransfer = new DataTransfer()

        dataTransfer.items.add(testFile)
        input[0].files = dataTransfer.files
        return input
      })
  }
)

Cypress.Commands.add(
  'dialogScrollTo',
  (target = 'bottom') => {
    return cy.get('.d2-crud .el-dialog__wrapper:visible').scrollTo(target)
  }
)
