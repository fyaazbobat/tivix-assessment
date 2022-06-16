
describe('Test-1: - Test search functionality for model', () => {

  //import necessary env
  const search = Cypress.env('rentSearch')

  // information
  const country_name = 'France'
  const city_name = 'Paris'
  const model_name = 'Mazda'
  const pick_up_date = '2022-06-21'
  const drop_off_date = '2022-06-24'


  const validation = "validate_completion"

  beforeEach(() => {
    cy.visit('http://qalab.pl.tivixlabs.com/')
  })

  it('Check ability to search for a car in the country of France & city of paris', () => {
    cy.intercept("GET", 'http://qalab.pl.tivixlabs.com/?country=3&city=4&model=Mazda&pickup=2022-06-21&dropoff=2022-06-24').as(validation)
    cy.log('I enter ' + country_name + ', ' + city_name + ', ' + model_name + ', ' + pick_up_date + ', ' + drop_off_date + ' to search for a rental car ')
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
  })
})
