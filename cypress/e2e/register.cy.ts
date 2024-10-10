describe('Register', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should register successfully with valid credentials', () => {
    const randomString = Math.random().toString(36).substring(2, 10)
    const randomEmail = `test_${randomString}@example.com`
    const password = 'testtest'
    const registerButtonText = 'Đăng ký'

    // Register
    cy.get('input[name="email"]').type(randomEmail)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="confirm_password"]').type(password)
    cy.contains('button[type="submit"]', registerButtonText).click()

    // Verify successful register
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    // Verify that the email was used
    cy.contains(randomEmail).should('exist')
  })
})
