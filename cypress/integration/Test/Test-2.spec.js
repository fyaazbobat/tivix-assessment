
describe('Test-2: Expect 404 page not found when renting car out', () => {

  //import necessary env
  const search = Cypress.env('rentSearch')

  // information
  const country_name = 'France'
  const city_name = 'Paris'
  const model_name = 'Mazda'
  const pick_up_date = '2022-06-21'
  const drop_off_date = '2022-06-24'

  const first_name = 'Test'
  const last_name = 'Test'
  const card_num = '1111111111111111'
  const email = 'test@test.com'

  const validation = "validate_completion"

    beforeEach(() => {
      cy.visit('http://qalab.pl.tivixlabs.com/')
    })
  
    it('Check ability to get 404 Page not found error when renting car out', () => {
      cy.intercept("GET", 'http://qalab.pl.tivixlabs.com/?country=3&city=4&model=Mazda&pickup=2022-06-21&dropoff=2022-06-24').as(validation)
      
      cy.log('I enter required information to search for a rental car ')
      search.search_for_rental(country_name, city_name, model_name, pick_up_date, drop_off_date)
  
      cy.log('I click search button')
      cy.button()
      
      cy.log('I validate search button successfully loads next page')
      search.validate_api_status(validation)
  
      cy.log('I validate car model is displayed on the table') //Bug - table shows cars for all models
      search.validate_car_model(model_name)
  
      cy.log('I click rent button')
      cy.rentButton()
  
      cy.log('I validate car details matches search')
      search.validate_search_to_card_page(model_name, country_name, city_name, pick_up_date, drop_off_date)
      
      cy.wait(5000)

      cy.log('I click rent button')
      cy.button()

      cy.log('I enter information on the rent form')
      search.rent_form(first_name, last_name, card_num, email)
  
    })
})
  
  