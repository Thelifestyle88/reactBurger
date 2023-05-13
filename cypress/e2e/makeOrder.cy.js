import { baseUrl } from '../../src/utils/tests';
import { testBun, testMain, testSauce } from '../../src/utils/tests';
describe('run application', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.setCookie('accessToken', 'Bearer 1234567890');
    cy.setCookie('refreshToken', '0987654321');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'data.json',
    }).as('ingredients');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json',
    });
    cy.intercept('POST', `${baseUrl}/orders`, { fixture: 'order.json' }).as('order');
  });

  it('заказ бургера', function () {
    cy.get('h1').should('exist').and('contain', 'Соберите бургер');

    cy.get('[data-testid=ingredient-1]').should('exist');
    cy.get('[data-testid=ingredient-2]').should('exist');
    cy.get('[data-testid=ingredient-3]').should('exist');

    cy.get('[data-testid=ingredient-1]').trigger('dragstart');
    cy.get('[data-testid=dropTarget]').trigger('drop');

    cy.get('[data-testid=ingredient-2]').trigger('dragstart');
    cy.get('[data-testid=dropTarget]').trigger('drop');

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-testid=ingredient-3]').scrollIntoView().should('be.visible');
    cy.get('[data-testid=ingredient-3]').trigger('dragstart');
    cy.get('[data-testid=dropTarget]').trigger('drop');

    cy.get(`[data-testid=buttonMakeOrder]`)
      .should('exist')
      .and('contain', 'Оформить заказ')
      .click();
    cy.wait('@order').get(`[data-testid=orderId]`).should('exist').and('contain', '1234');

    cy.get('body').type('{esc}');
    cy.get('h1').should('exist').and('contain', 'Соберите бургер');

    cy.get('[data-testid=profile]').should('exist').click();
  });
});

export {};
