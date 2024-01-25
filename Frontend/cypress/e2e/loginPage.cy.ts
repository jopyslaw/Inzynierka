describe('Login e2e tests', () => {
  it('should login to admin account', () => {
    cy.visit('/');
    cy.get('#loginOption').click();

    cy.url().should('include', '/login');

    cy.get('#login').type('admin');
    cy.get('#password').type('admin');

    cy.get('#login').should('have.value', 'admin');
    cy.get('#password').should('have.value', 'admin');

    cy.get('#loginBtn').click();

    cy.url().should('include', '/');
    cy.contains('To co wyciągamy karteczki ?');
  });
});
