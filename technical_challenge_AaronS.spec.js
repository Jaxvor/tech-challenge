describe('technical challenge tests', () => {
    beforeEach(() => {
        cy.visit('https://computer-database.gatling.io/computers')
    })


    it('run a search, enter', () => {
        //This is a test of the search functionality. The assert will check the url matches the search term entered to verify
        //the search has progressed to the results page.
        cy.get('#searchbox').type('amiga{enter}')
        cy.url().should('eq', 'https://computer-database.gatling.io/computers?f=amiga')
        cy.contains('Amiga').should('be.visible')
    })
    
    it('run a search, button', () => {
        //This is a test of the search functionality. This time it will click the search button rather than hit enter.
        cy.get('#searchbox').type('amiga')
        cy.get('#searchsubmit.btn.primary').click()
        cy.url().should('eq', 'https://computer-database.gatling.io/computers?f=amiga')
        cy.contains('Amiga').should('be.visible')
    })

    it('add a new computer', () => {
        //This test will test the 'add a new computer' functionality. This test adds a new computer and then
        //checks the confirmation message has appeared to indicate success.
        cy.get('#add.btn.success').click()
        cy.location('pathname').should('eq', '/computers/new')
        cy.get('#name').type('Test Computer 5000')
        cy.get('#introduced').type('2022-01-01')
        cy.get('#discontinued').type('2022-01-31')
        cy.get('#company').select('IBM')
        cy.get('.btn.primary').click()
        cy.url().should('eq', 'https://computer-database.gatling.io/computers')
        cy.contains('has been created').should('be.visible')
        //I could run a search for my new computer at this point to ensure the entry was created but it seems
        //that my test entry does not get created in the database when I run this test!
    })


    it('open existing computer entry', () => {
        //This test will click on the first entry in the computers list 'ACE', verify the url 
        //and then verify the computer name on the Edit Computer page.
        cy.get('a[href*="/computers/381"]').click()
        cy.url().should('eq', 'https://computer-database.gatling.io/computers/381')
        cy.get('#name').should('have.value', 'ACE')
    })


    it('test database page pagination navigation', () => {
        //This test will check that the pagination is working and will allow users to click and view the
        //next page of results.
        cy.get('a[href="/computers?p=1&n=10&s=name&d=asc"]').click()
        cy.url().should('eq', 'https://computer-database.gatling.io/computers?p=1&n=10&s=name&d=asc')
        cy.contains('Displaying 11 to 20 of 574').should('be.visible') //This part of thetest is brittle though 
        //as more entries are added to the database, the pagination values will change
        //to reflect the increase/decrease in entries.
    })
    

})