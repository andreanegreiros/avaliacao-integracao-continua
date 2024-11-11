import { faker } from '@faker-js/faker';

describe('Trabalho ', () => {
    const userName = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    it('Test Case 1: Register User', () => {
        //criar conta
        cy.createAccount(userName, email, password);

        //Apagar conta
        cy.deleteAccount();
    });

    it('Test Case 2: Login User with correct email and password', () => {
        //Criar conta
        cy.createAccount(userName, email, password);

        //Sair da conta para poder logar
        cy.logout();

        //Entrar na conta criada
        cy.login(userName, email, password);

        cy.contains(`Logged in as ${userName}`, { matchCase: false }).should('be.visible');

        //Apagar a conta 
        cy.deleteAccount();
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.login('nenhum usuario', 'ldhsfuhdu87e98@gmail.com', crypto.randomUUID().toString());

        cy.contains('Your email or password is incorrect!', { matchCase: false }).should('be.visible');
    });

    it('Test Case 4: Logout User', () => {
        //Criar conta
        cy.createAccount(userName, email, password);

        //Sair da conta para poder logar
        cy.logout();

        cy.url().should('eq', 'https://automationexercise.com/login')

        cy.login(userName, email, password);

        cy.deleteAccount();
    });

    it('Test Case 5: Register User with existing email', () => {
        //Criar conta
        cy.createAccount(userName, email, password);

        //Sair da conta para poder logar
        cy.logout();

        cy.url().should('eq', 'https://automationexercise.com/login')

        cy.get('input[data-qa=signup-name]').type(userName);
        cy.get('input[data-qa=signup-email]').type(email);

        cy.get('button[data-qa=signup-button]').click();

        cy.contains('Email Address already exist!', { matchCase: false }).should('be.visible');

        cy.login(userName, email, password);

        cy.deleteAccount();
    });


    it('Test Case 6: Contact Us Form', () => {
        cy.visit('https://automationexercise.com/');

        //verificar se site abriu
        cy.get("img[alt='Website for automation practice']").should('be.visible');

        cy.get("a[href='/contact_us'").click();

        cy.contains('GET IN TOUCH', { matchCase: false }).should('be.visible');

        cy.get('input[data-qa=name]').type('usuario');
        cy.get('input[data-qa=email]').type('teste@gmail.com');
        cy.get('input[data-qa=subject]').type('subject');
        cy.get('textarea[data-qa=message]').type('message');

        cy.get("input[type='file']").selectFile({
            contents: Cypress.Buffer.from('file contents'),
            fileName: 'file.txt',
            mimeType: 'text/plain',
            lastModified: Date.now(),
        });

        cy.on('window:confirm', () => true);

        cy.get("input[data-qa='submit-button'").click();

        cy.contains("Success! Your details have been submitted successfully.", { matchCase: false }).should('be.visible');

        cy.get(".fa-home").click();

        cy.get("img[alt='Website for automation practice']").should('be.visible');
    });


    it('Test Case 8: Verify All Products and product detail page', () => {
        cy.navigateAllProducts();

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
            .first()
            .parent()
            .contains('View Product')
            .click();

        cy.url().should('include', 'https://automationexercise.com/product_details/');

        cy.get('.product-information > h2').should('be.visible');
        cy.get('.product-information p').should('be.visible').and('have.length', 4);
        cy.get('.product-information span span').should('be.visible');
        cy.get('.product-information p b').should('be.visible').and('contain', 'Availability:');
        cy.get('.product-information p b').should('be.visible').and('contain', 'Condition:');
        cy.get('.product-information p b').should('be.visible').and('contain', 'Brand:');
    });


    it('Test Case 9: Search Product', () => {
        cy.navigateAllProducts();

        cy.get('#search_product').type("blue");

        cy.get('#submit_search').click();

        cy.contains('SEARCHED PRODUCTS', { matchCase: false }).should('be.visible');

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
    });

    it('Test Case 10: Verify Subscription in home page', () => {
        cy.visit('https://automationexercise.com/');

        //verificar se site abriu
        cy.get("img[alt='Website for automation practice']").should('be.visible');

        cy.get('footer').scrollIntoView();

        cy.get('h2').contains('SUBSCRIPTION', { matchCase: false }).should('be.visible');

        cy.get('input#susbscribe_email').type(email);

        cy.get('button#subscribe').click()

        cy.contains('You have been successfully subscribed!', { matchCase: false }).should('be.visible')
    });

    it('Test Case 15: Place Order: Register before Checkout', () => {
        //Criar conta
        cy.createAccount(userName, email, password);

        cy.get("a[href='/products'").click();

        cy.contains('ALL PRODUCTS', { matchCase: false }).should('be.visible');

        cy.get(".productinfo a").each((el, index) => {
            if (index < 3) {
                cy.wrap(el).click();
                cy.get('.modal-footer button').click();
            }
        });

        cy.get("ul li a[href='/view_cart']").click();

        cy.url().should('eq', 'https://automationexercise.com/view_cart');

        cy.get('.btn-default.check_out').should('be.visible');
        cy.get('.btn-default.check_out').click();

        cy.get('.heading').first().should('have.text', 'Address Details');
        cy.get('.heading').last().should('have.text', 'Review Your Order');

        cy.get('.btn-default.check_out').click();


        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
        cy.get('[data-qa="expiry-month"]').type(12);
        cy.get('[data-qa="expiry-year"]').type(2035);

        cy.get('[data-qa="pay-button"]').click();

        cy.get('[data-qa="order-placed"]').should('be.visible');

        cy.deleteAccount();

    });
})
