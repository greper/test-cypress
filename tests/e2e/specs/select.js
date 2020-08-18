// https://docs.cypress.io/api/introduction/api.html

describe('选择组件', () => {
  before(() => {
    cy.login()
  })

  it('打开', () => {
    cy.visit('/#/demo/form/select')
    cy.wait(1000)
  })
  it('翻页', () => {
    // 翻页
    cy.log('翻页')
    cy.get('.el-pagination ul.el-pager li').contains('2').click()
    cy.checkId(context, '1', false) // 这是一个自定义命令，检查列表第一行id是否不为1
    cy.get('.el-pagination ul.el-pager li').contains('1').click()
    cy.checkId(context, '1') // 这是一个自定义命令，检查列表第一行id是否为1
  })
  it('添加', () => {
    // 添加
    cy.log('添加')
    cy.openAdd(context) // 自定义命令，打开添加对话框

    // 测试添加对话框里的表单选项
    // 找到表单的选择框
    cy.formItem('单选远程').find('.el-select').click()
    cy.getSelectOptions().first().click() // 点击选择框，并选择第一项

    // 点击单选框，选中第一项
    cy.formItem('radio').find('.el-radio').first().click()

    // 点击保存
    cy.closeDialog(context) // 自定义命令，关闭对话框

    // 检查是否保存成功
    cy.checkId(context, '1', false) // 这是一个自定义命令，检查列表第一行id是否不为1，说明添加成功

    // 校验其他列的值是否与添加表单时选的值一致
    cy.checkColValue({ col: 2, value: '打开' }) // 校验列中展示的值是否是选择框里的第一项
    cy.checkColValue({ col: 10, value: '打开' }) // 校验列中展示的值是否是radio里的第一项
  })

  it('编辑', () => {
    cy.log('编辑')
    // 打开编辑对话框
    cy.openEdit(context) // 自定义命令，点击第一行的编辑按钮

    // 测试表单对话框里的选项
    // TODO

    // 点击保存
    cy.closeDialog(context) // 自定义命令
    cy.wait(1000)
  })

  it('查看', () => {
    cy.log('查看')
    // 打开编辑对话框
    cy.openView(context) // 自定义命令，点击第一行查看按钮

    cy.closeDialog(context)// 自定义命令，点击保存
  })
  it('删除', () => {
    cy.log('删除')
    cy.doDelete(context) // 自定义命令，点击第一行的删除按钮
  })
})
