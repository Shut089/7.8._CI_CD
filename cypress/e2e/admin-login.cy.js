describe("Admin authentication", () => {
  beforeEach(() => {
    cy.fixture("selectors").as("selectors");
    cy.fixture("users").as("users");
  });

  it("logs in with valid credentials", function () {
    const { adminPage } = this.selectors;
    const { happy } = this.users;

    cy.visit("/admin");
    cy.get(adminPage.emailInput).type(happy.email);
    cy.get(adminPage.passwordInput).type(happy.password);
    cy.get(adminPage.submitButton).click();

    cy.url().should("include", "/admin");
    cy.contains(adminPage.sections.hallManagement).should("be.visible");
    cy.contains(adminPage.sections.hallConfig).should("be.visible");
    cy.contains(adminPage.sections.sales).should("be.visible");
  });

  it("shows an authorization error with invalid credentials", function () {
    const { adminPage } = this.selectors;
    const { sad } = this.users;

    cy.visit("/admin");
    cy.get(adminPage.emailInput).type(sad.email);
    cy.get(adminPage.passwordInput).type(sad.password);
    cy.get(adminPage.submitButton).click();

    cy.contains(adminPage.errorMessage).should("be.visible");
  });
});
