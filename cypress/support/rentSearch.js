
class rentSearch {
    constructor() {
        this.country = '#country'
        this.city = '#city'
        this.model = '#model'
        this.pickup = '#pickup'
        this.dropoff = '#dropoff'
        this.mazda3 = 'tbody > :nth-child(1) > :nth-child(3)'
        this.card_header = '.card-header'
        this.card_pickup_date = '.card-body > :nth-child(5)'
        this.card_location = '.card-body > :nth-child(3)'
        this.card_dropoff_date = '.card-body > :nth-child(6)'
        this.fname = '#name'
        this.lname = '#last_name'
        this.card_num = '#card_number'
        this.email = '#email'
    }

    
    /**
     * This function searches for a rental car in a given country, city, model, pick up date, and drop
     * off date
     * @param country_name - The name of the country you want to search for.
     * @param city_name - The name of the city you want to search for a rental in.
     * @param model_name - The name of the car model you want to rent.
     * @param pick_up_date - The date you want to pick up the car.
     * @param drop_off_date - The date you want to drop off the car.
     */
    search_for_rental(country_name, city_name, model_name, pick_up_date, drop_off_date) {
        cy.wait(2000)
        cy.get(this.country).select(country_name)
        cy.get(this.city).select(city_name)
        cy.get(this.model).type(model_name)
        cy.get(this.pickup).type(pick_up_date)
        cy.get(this.dropoff).type(drop_off_date)
    }
    
    validate_api_status() {
        cy.wait('@validate_completion').its('response.statusCode').should('eq',200)
    }

    /**
     * This function will validate that the car model is present in the table.
     * @param model_name - The car model to be validated
     */
    validate_car_model(model_name) {
        cy.get('tbody > :nth-child(1) > :nth-child(3)').contains(model_name)
    }

   /**
    * This function validates the search results page by checking the header and the pickup date
    * @param country_name - The name of the country you want to search for
    * @param city_name - The name of the city you want to search for
    * @param model_name - The name of the car model you want to search for.
    * @param pick_up_date - The date you want to pick up the car
    * @param drop_off_date - The date you want to drop off the car
    */
    validate_search_to_card_page(model_name,country_name, city_name, pick_up_date, drop_off_date) {
        cy.get(this.card_header).contains(`${model_name}`)
        cy.get(this.card_location).contains(`${country_name}`)
        cy.get(this.card_location).contains(`${city_name}`)
        cy.get(this.card_pickup_date).contains(`${pick_up_date}`)
        cy.get(this.card_dropoff_date).contains(`${drop_off_date}`)
        cy.get('.btn').should('be.visible')
        cy.wait(2000)
    }

   /**
    * This function takes in four parameters and types them into the corresponding fields on the rental
    * form
    * @param first_name - The first name of the person renting the car
    * @param last_name - The last name of the person renting the car
    * @param card_num - The credit card number you want to use.
    * @param email - the email address you want to use to sign up
    */
    rent_form(first_name, last_name, card_num, email) {
        cy.get(this.fname).type(first_name)
        cy.get(this.lname).type(last_name)
        cy.get(this.card_num).type(card_num)
        cy.get(this.email).type(email)
        cy.get('.btn').should('be.visible').click()

    }

    /**
     * This function takes in three parameters, country_name, city_name, and model_name, and then
     * selects the country, city, and model name from the dropdown menus
     * @param country_name - The name of the country you want to select.
     * @param city_name - The name of the city you want to select.
     * @param model_name - The name of the model you want to search for.
     */
    validate_alert_date(country_name, city_name, model_name) {
        cy.get(this.country).select(country_name)
        cy.get(this.city).select(city_name)
        cy.get(this.model).type(model_name)
        cy.get('.btn').should('be.visible').click()
        cy.wait(2000)

        cy.get('.alert').contains('Please fill pickup and drop off dates')
    }

    /**
     * This function takes in three parameters, first name, last name, and card number, and then types
     * them into the corresponding fields. It then clicks the submit button and waits for the alert to
     * appear. Finally, it asserts that the alert contains the text "Card number is required"
     * @param first_name - First name of the user
     * @param last_name - This is the last name of the user
     * @param card_num - The card number to be entered
     */
    validate_alert_email(first_name, last_name, card_num) {
        cy.get(this.fname).type(first_name)
        cy.get(this.lname).type(last_name)
        cy.get(this.card_num).type(card_num)
        cy.get('.btn').should('be.visible').click()
        cy.wait(2000)

        cy.get('.alert').contains('Email is required')
    }

    /**
     * This function will enter the first name, last name, email, and card number into the form and
     * click the submit button. It will then wait 2 seconds and check for the alert message that the
     * card number is too long.
     * @param first_name - First name of the user
     * @param last_name - The last name of the user
     * @param card_num - This is the card number that will be entered into the card number field.
     * @param email - a valid email address
     */
    validate_alert_cardnum_exceeded(first_name, last_name, card_num, email) {
        cy.get(this.fname).type(first_name)
        cy.get(this.lname).type(last_name)
        cy.get(this.email).type(email)
        cy.get(this.card_num).type(card_num)
        cy.get('.btn').should('be.visible').click()
        cy.wait(2000)

        cy.get('.alert').contains('Card number value is too long')

    }
}
export default rentSearch;