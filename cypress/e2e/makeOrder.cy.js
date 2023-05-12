import { baseUrl } from '../../src/utils/tests';
import { testBun, testMain, testSauce } from '../../src/utils/tests';
describe('run application', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.setCookie('accessToken', 'Bearer 1234567890');
    cy.setCookie('refreshToken', '0987654321');
    cy.intercept('GET', `${baseUrl}/ingredients`, { fixture: 'data.json' }).as('ingredients');
    cy.intercept('POST', `${baseUrl}/orders`, { fixture: 'order.json' }).as('order');
    cy.intercept('POST', `${baseUrl}/auth/login`, { fixture: 'user.json' }).as('login');
    cy.intercept('POST', `${baseUrl}/auth/logout`, { fixture: 'logout.json' }).as('logout');
  });

  it('аутентификация пользователя и заказ бургера', function () {
    cy.get('h1').should('exist').and('contain', 'Соберите бургер');

    cy.get(`#${testBun._id}`).should('exist');
    cy.get(`#${testSauce._id}`).should('exist');
    cy.get(`#${testMain._id}`).should('exist');

    cy.get(`#${testBun._id}`).trigger('dragstart');
    cy.get('[data-testid=bunTarget]').trigger('drop');

    cy.get(`#${testSauce._id}`).trigger('dragstart');
    cy.get('[data-testid=bunIngredientTarget]').trigger('drop');

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get(`#${testMain._id}`).scrollIntoView().should('be.visible');
    cy.get(`#${testMain._id}`).trigger('dragstart');
    cy.get('[data-testid=bunIngredientTarget]').trigger('drop');

    cy.get(`[data-testid=buttonMakeOrder]`)
      .should('exist')
      .and('contain', 'Оформить заказ')
      .click();
    cy.wait('@order').get(`[data-testid=orderId]`).should('exist').and('contain', '1234');

    cy.get('body').type('{esc}');
    cy.get('h1').should('exist').and('contain', 'Соберите бургер');

    cy.get('[data-testid=profile]').should('exist').click();

    cy.get('#logout').should('exist').click();

    cy.wait('@logout').get('h1').should('exist').and('contain', 'Соберите бургер');
  });
});

export {};
