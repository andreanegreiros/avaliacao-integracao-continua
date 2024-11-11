// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createAccount', (userName, email, password) => {
    //acessar site
    cy.visit('https://automationexercise.com/');

    //verificar se site abriu
    cy.get("img[alt='Website for automation practice']").should('be.visible');

    //4. Click on 'Signup / Login' button
    cy.get("a[href='/login'").click();

    //5. Verify 'New User Signup!' is visible
    cy.contains('New User Signup!').should('be.visible');

    //6. Enter name and email address
    cy.get('input[data-qa=signup-name]').type(userName);
    cy.get('input[data-qa=signup-email]').type(email);

    //7. Click 'Signup' button
    cy.get('button[data-qa=signup-button]').click();

    //8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    //Utilizando match case pois existe uma transformação css
    cy.contains('ENTER ACCOUNT INFORMATION', { matchCase: false });

    //9. Fill details: Title, Name, Email, Password, Date of birth
    cy.get('input[value=Mrs').check();
    cy.get('#password').type(password);
    cy.get('select[data-qa=days]').select('1');
    cy.get('select[data-qa=months]').select('1');
    cy.get('select[data-qa=years]').select('1950');

    //10. Select checkbox 'Sign up for our newsletter!'
    cy.get('#newsletter').check();

    //11. Select checkbox 'Receive special offers from our partners!'
    cy.get('#optin').check();

    //12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    cy.get('input[data-qa=first_name]').type('andrea');
    cy.get('input[data-qa=last_name]').type('negreiros');
    cy.get('input[data-qa=company]').type('minha empresa');
    cy.get('input[data-qa=address]').type('meu endereco');
    cy.get('input[data-qa=address2]').type('numero 700');
    cy.get('select[data-qa=country]').select('United States');
    cy.get('input[data-qa=state]').type('ceara');
    cy.get('input[data-qa=city]').type('fortaleza');
    cy.get('input[data-qa=zipcode]').type('60000000');
    cy.get('input[data-qa=mobile_number]').type('85 999999999');

    //13. Click 'Create Account button'
    cy.get("button[data-qa=create-account]").click();

    //14. Verify that 'ACCOUNT CREATED!' is visible
    cy.contains('ACCOUNT CREATED!', { matchCase: false }).should('be.visible');

    //15. Click 'Continue' button
    cy.get("a[data-qa=continue-button]").click();

    //16. Verify that 'Logged in as username' is visible
    cy.contains(`Logged in as ${userName}`, { matchCase: false }).should('be.visible');
});

Cypress.Commands.add('deleteAccount', () => {
    //17. Click 'Delete Account' button
    cy.get("a[href='/delete_account'").click();

    //18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.contains('ACCOUNT DELETED!', { matchCase: false }).should('be.visible');
    cy.get("a[data-qa=continue-button]").click();
});

Cypress.Commands.add('logout', () => {
    cy.get("a[href='/logout'").click();
});

Cypress.Commands.add('login', (userName, email, password) => {
    cy.visit('https://automationexercise.com/');

    //verificar se site abriu
    cy.get("img[alt='Website for automation practice']").should('be.visible');

    cy.get("a[href='/login'").click();

    cy.get('input[data-qa=login-email]').type(email);
    cy.get('input[data-qa=login-password]').type(password);

    cy.get('button[data-qa=login-button]').click();
});

Cypress.Commands.add('navigateAllProducts', () => {
    cy.visit('https://automationexercise.com/');

    //verificar se site abriu
    cy.get("img[alt='Website for automation practice']").should('be.visible');

    cy.get("a[href='/products'").click();

    cy.contains('ALL PRODUCTS', { matchCase: false }).should('be.visible');
});
