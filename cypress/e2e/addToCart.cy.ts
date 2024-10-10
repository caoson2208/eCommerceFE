describe('Search', () => {
  before(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'))
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('should search for products, add to cart, and complete purchase', () => {
    const searchTerm = 'Đồng hồ'
    const addToCartText = 'Thêm vào giỏ hàng'
    const viewCartText = 'Xem giỏ hàng'
    const purchaseText = 'Mua hàng'
    const emptyCartMessage = 'Giỏ hàng của bạn còn trống'

    // Search for product
    cy.get('input[name="name"]').type(searchTerm)
    cy.get('form > div > button').click()

    // Select first product
    cy.xpath("//*[@id='root']/div[1]/div/div/div/div[2]/div[2]/div[1]/a").click()

    // Add to cart
    cy.contains('button', addToCartText).click()

    // Open cart
    cy.get('svg.h-8.w-8').click()
    cy.contains(viewCartText).click()

    // Select all items in cart
    cy.get('input[type="checkbox"]').first().click()

    // Complete purchase
    cy.contains('button', purchaseText).click()

    // Verify empty cart message
    cy.contains('div', emptyCartMessage).should('be.visible')
  })
})
