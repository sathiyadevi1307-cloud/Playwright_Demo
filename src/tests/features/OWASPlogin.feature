
Feature: OWASP Juice Shop customer login
  As a registered Juice Shop customer
  I want to log in with my email address and password
  So that I can access my account and shop

  Background:
    Given I open the OWASP Juice Shop login page

  Scenario: Display the login page
    Then I should see the "Login" heading
    And I should see the email field
    And I should see the password field
    And I should see the Remember me checkbox
    And I should see the "Log in" button
    
