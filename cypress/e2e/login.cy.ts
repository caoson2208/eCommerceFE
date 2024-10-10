describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should log in successfully with valid credentials and then log out', () => {
    const loginButtonText = 'Đăng nhập'
    const logoutButtonText = 'Đăng xuất'

    // Login
    cy.get('input[name="email"]').type(Cypress.env('email'))
    cy.get('input[name="password"]').type(Cypress.env('password'), { log: false })
    cy.contains('button[type="submit"]', loginButtonText).click()

    // Verify successful login
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    // Open user menu
    cy.get('nav > div.flex.items-center > div:nth-child(2) > div').click()

    // Logout
    cy.contains(logoutButtonText).click()

    // Verify successful logout
    cy.url().should('include', '/')
  })
})
