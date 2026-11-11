
Feature: OWASP Juice Shop Shopping Basket and Checkout

  As a registered Juice Shop customer
  I want to add products to my basket
  So that I can purchase multiple products

  Background:
    Given I open the OWASP Juice Shop home page
    When I log in with valid credentials

  Scenario: Add two products to the basket and proceed to checkout
    When I add two products to the basket
    And I open the shopping basket
    When I click on the Checkout button
    Then I should see the address page
    Then I fill in the delivery address details
    Then I should select one address from the list
    Then I should see the payment page
    Then I should select a payment method
    
    