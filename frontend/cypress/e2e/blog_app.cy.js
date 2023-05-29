describe('tBlog app', () => {
  beforeEach(function() {
    cy.request('POST' , 'http://localhost:3000/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('login page is shown', function() {
    cy.contains('Log in to application');
  });
});