describe('tBlog app', () => {
  beforeEach(function() {
    const user = { 
      name: 'T. E. Ster', 
      username: 'tester', 
      password: 'tester'
    };
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    cy.request('POST', 'http://localhost:3000/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('login page is shown', function() {
    cy.contains('Log in to application');
  });

  describe('Login', function() {
    it('login successfully', function() {
      cy.get('#username').type('tester');
      cy.get('#password').type('tester');
      cy.get('#login-button').click();
      cy.contains('T. E. Ster logged in');
    });

    it('login unsuccessfully', function() {
      cy.get('#username').type('tester');
      cy.get('#password').type('test');
      cy.get('#login-button').click();
      cy.get('.error-message')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});