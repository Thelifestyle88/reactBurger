import { baseUrl } from '../../src/utils/tests';
import { testBun, testMain, testSauce } from '../../src/utils/tests';
const notification = `[data-testid=notification]`;

describe('run application', function () {
  beforeEach(() => {
    cy.intercept('GET', `${baseUrl}/ingredients`, {
      statusCode: 200,
      body: { success: true, data: [testBun, testBun, testMain, testSauce] },
    });

    cy.intercept('POST', `${baseUrl}/auth/login}`, { delay: 1000, fixture: 'user.json' }).as(
      'login',
    );
    cy.intercept('POST', `${baseUrl}/orders`, {
      delay: 1000,
      fixture: 'order.json',
    }).as('order');
    cy.intercept('POST', `${baseUrl}/auth/logout`, {
      delay: 1000,
      fixture: 'logout.json',
    }).as('logout');
  });

  it('аутентификация пользователя и заказ бургера', function () {
    cy.get('h1').should('exist').and('contain', 'Соберите бургер');

    cy.get(notification).should('exist').click();

    cy.get('h1').should('exist').and('contain', 'Вход');
    cy.get('[type="email"]').should('exist');
    cy.get('[type="password"]').should('exist');
    cy.get('[type="submit"]').should('exist').and('contain', 'Войти');

    cy.get('.input__icon').first().click();
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[type="email"]').type('test@gmail.com').should('have.value', 'test@gmail.com');
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[type="password"]').type('123456').should('have.value', '123456');
    cy.get('[type="submit"]').contains('Войти').click();

    cy.get(notification).should('exist');
    cy.wait('@login')
      .setCookie('accessToken', 'Bearer 1234567890')
      .setCookie('refreshToken', '0987654321');

    cy.get(`#${testBun._id}`).should('exist');
    cy.get(`#${testSauce._id}`).should('exist');
    cy.get(`#${testMain._id}`).should('exist');

    cy.get(`#${testBun._id}`).trigger('dragstart');
    cy.get('[data-testid=bunTopTarget]').trigger('drop');

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
    cy.get(notification).should('exist');
    cy.wait('@order').get(`[data-testid=orderId]`).should('exist').and('contain', '1234');

    cy.get('body').type('{esc}');
    cy.get('h1').should('exist').and('contain', 'Соберите бургер');

    cy.get('[data-testid=profile]').should('exist').click();

    cy.get('#logout').should('exist').click();
    cy.get(notification).should('exist');

    cy.wait('@logout').get('h1').should('exist').and('contain', 'Соберите бургер');
  });
});

export {};
