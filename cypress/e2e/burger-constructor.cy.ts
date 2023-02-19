describe('burger constructor.', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('host'))
  });  

  it('should open homepage', function () {
    cy.contains('Соберите бургер');
  });

  it('should handle modal', function () {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('#react-modals').should('not.be.empty');
    cy.get('[data-testid="close-modal"]').click({
      force: true
    });
    cy.get('#react-modals').should('be.empty');
  });

  it("should dragNdrop and create order", () => {
    const email = "test15@test.test";
    const password = "123";

    cy.get('[data-testid="ingredient"][draggable]:eq(0)').trigger('mousedown', {
        which: 1
      })
      .trigger('dragstart')
      .trigger('drag', {});
    cy.get('[data-testid="constructor"]').trigger('dragover')
      .trigger('drop')
      .trigger('dragend')
      .trigger('mouseup', {
        which: 1
      });
    cy.get('.constructor-element_pos_top').should('not.be.empty');
    cy.get('.constructor-element_pos_bottom').should('not.be.empty');
    cy.get('[data-testid="ingredient"][draggable]:eq(3)').trigger('mousedown', {
        which: 1
      })
      .trigger('dragstart')
      .trigger('drag', {});
    cy.get('[data-testid="constructor"]').trigger('dragover')
      .trigger('drop')
      .trigger('dragend')
      .trigger('mouseup', {
        which: 1
      });;
    cy.get('[data-testid="constructor-list"]').children('li');    
    cy.get('[data-testid="send-order"]').should("exist").click();    
    cy.get('input[name="email"]').type(`${email}`);
    cy.get('input[name="password"]').type(`${password}{enter}`);    
    cy.get('[data-testid="send-order"]').should("exist").click();
    cy.intercept({
        url: `${Cypress.env('host_API')}/orders`,
        method: 'POST',
      },{
        fixture: 'create-order'
    }).as('createOrder');
    cy.wait('@createOrder');
    cy.get('#react-modals').should('not.be.empty');
    cy.get('#react-modals').contains('41283');
    cy.get('[data-testid="close-modal"]').click({
      force: true
    });
    cy.get('#react-modals').should('be.empty');
    cy.get('.constructor-element_pos_top').should('have.text', 'Выберите булку');
    cy.get('.constructor-element_pos_bottom').should('have.text', 'Выберите булку');
    cy.get('[data-testid="constructor-list"]').children('div');
  });
})
