describe('Cypress task', () => {
    //testIsolation: false
   
    it('Displays seven popular product by default', () => {
        cy.visit('https://prestashop.ryviushop.com/')
        cy.get('#homefeatured')
            .find('li').its('length').should('eq', 7)
    })

    it('Returns the correct result when the user searches for blouse', () => {
        cy.get('[name="search_query"]').type('blouse')
        cy.get('[name="submit_search"]').click()
        cy.get('#product_list').find('li').then(list => {
            cy.wrap(list).find('h5').invoke('prop', 'outerText').then(outerText => {
                expect(outerText).to.be.eql('Blouse')
            })
        })
    })

    it('Opens a detailed page on a product when clicked', () => {
        cy.contains('More').click()
        cy.url().should('contain', '2-blouse')
        cy.contains('h1', 'Blouse').should('have.text', 'Blouse')
    })

    it('Contains the correct short description of the product', () => {
        cy.get('#short_description_content')
            .should('have.text', 'Short-sleeved blouse with feminine draped sleeve detail.')
    })

    it('Inform the user there is 1 item in their cart', () => {
        cy.get('input[type="number"]').should('have.value', 1)
        cy.wait(500)
        cy.contains('button', 'Add to cart').click()
        cy.get('#layer_cart').should('be.visible').then(cart => {
            cy.wrap(cart)
                .find('.ajax_cart_product_txt ')
                .invoke('prop', 'outerText').then(outerText => {
                    expect(outerText).to.be.eql('There is 1 item in your cart.')
                })
        })
    })
})