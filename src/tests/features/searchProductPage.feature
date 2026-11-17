Feature: Product Search Functionality

  As a user of OWASP Juice Shop
  I want to search for products
  So that I can find my desired products easily

  Background:
    Given I open the login page
    When I log in with credentials
    When I click on the search icon  

  Scenario: Verify product search with a valid product name
    When I click on the search icon
    Then I enter "Apple Juice" in the search bar
    Then the search results should display products matching "Apple Juice"
    Then I click on the add to cart button for the product "Apple Juice"
    
    When I navigate to the shopping cart
    Then I should see "Apple Juice" in the cart

    When I increase the quantity of "Apple Juice" to 2
   

    When I click on the checkout button
    Then I should be on the address page

    When I enter the delivery address details
    Then I should be able to select the address from the list

    When I should be able to see the payment page
    Then I should be able to select a payment method

  