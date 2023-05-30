describe('Blog app', () => {
  beforeEach(function() {
    const user1 = {
      name: 'T. E. Ster',
      username: 'tester',
      password: 'tester'
    };
    const user2 = {
      name: 'A. D. Min',
      username: 'admin',
      password: 'admin'
    };
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    cy.request('POST', 'http://localhost:3000/api/users', user1);
    cy.request('POST', 'http://localhost:3000/api/users', user2);
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

  describe('Blog Creation', function() {
    beforeEach(function() {
      cy.get('#username').type('tester');
      cy.get('#password').type('tester');
      cy.get('#login-button').click();
    });

    it('create new blog successfully', function() {
      const title = 'Bazinga! A Tale As Old As Time';
      const author = 'S. Cooper';
      cy.contains('new blog').click();
      cy.get('#blog-title').type(title);
      cy.get('#blog-author').type(author);
      cy.get('#blog-url').type('http://www.bazinga.com');
      cy.get('#create-button').click();

      cy.get('.success-message')
        .should('contain', `a new blog ${title} by ${author} added`)
        .and('have.css', 'color', 'rgb(0, 128, 0)');
      cy.contains(`${title} ${author}`);
    });

    it('like a blog', function() {
      const title = 'Bazinga! A Tale As Old As Time';
      const author = 'S. Cooper';
      cy.contains('new blog').click();
      cy.get('#blog-title').type(title);
      cy.get('#blog-author').type(author);
      cy.get('#blog-url').type('http://www.bazinga.com');
      cy.get('#create-button').click();

      cy.contains(`${title} ${author}`).contains('view').click();
      cy.contains('0').contains('like').click();

      cy.get('.blog')
        .should('contain', '1');
    });
  });
});