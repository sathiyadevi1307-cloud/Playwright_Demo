Feature:Remove product from the shopping basket
 
 Background:
     Given I open the OWASP Juice Shop home page for basket management
     When I log in with valid credentials for basket management
 
Scenario: Remove single product and verify cart total
    When I add two products to the basket for basket management
    And I open the shopping basket and verify its starting total
    And product name should be displayed in the basket
    When I remove one existing product from the basket
    When I click on the Checkout button for basket management
    Then I should see the address page for basket management
    Then I fill in the delivery address details for basket management
    Then I should select one address from the list for basket management
    Then I should see the payment page for basket management
    Then I should select a payment method for basket management
 