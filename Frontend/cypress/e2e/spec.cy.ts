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

describe('Register page tests', () => {
  it('should show message when password is not secure enough secure', () => {
    cy.visit('/');

    cy.contains('Zarejstruj się').click();

    cy.url().should('include', '/register');

    cy.get('#password').type('test');

    cy.get('#email').click();

    cy.contains(
      'Podane hasło musi zawierać minimum 8 znaków, jedną dużą literę, jedną małą literę, jedną liczbę i jeden znak specjalny'
    );
  });
});
