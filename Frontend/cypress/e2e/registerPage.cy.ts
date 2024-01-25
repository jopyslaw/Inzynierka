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
