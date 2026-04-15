describe("Movie booking", () => {
  beforeEach(() => {
    cy.fixture("selectors").as("selectors");
    cy.fixture("users").as("users");
  });

  it("books a ticket in a hall with open sales from admin", function () {
    const { adminPage, mainPage, hallPage, paymentPage } = this.selectors;
    const { happy } = this.users;

    cy.visit("/admin");
    cy.get(adminPage.emailInput).type(happy.email);
    cy.get(adminPage.passwordInput).type(happy.password);
    cy.get(adminPage.submitButton).click();
    cy.url().should("include", "/admin");

    cy.get(adminPage.startSales.radio).should("have.length.at.least", 1);

    let hallName = "";

    cy.get(adminPage.startSales.radio).eq(0).click({ force: true });
    cy.get(adminPage.startSales.statusText).then(($status) => {
      if ($status.text().trim() === adminPage.startSales.openSalesText) {
        cy.get(adminPage.startSales.radio)
          .eq(0)
          .siblings(adminPage.startSales.selectorLabel)
          .invoke("text")
          .then((text) => {
            hallName = text.trim();
          });
      }
    });

    cy.then(() => {
      if (hallName === "") {
        cy.get(adminPage.startSales.radio).eq(1).click({ force: true });
        cy.get(adminPage.startSales.statusText).then(($status) => {
          if ($status.text().trim() === adminPage.startSales.openSalesText) {
            cy.get(adminPage.startSales.radio)
              .eq(1)
              .siblings(adminPage.startSales.selectorLabel)
              .invoke("text")
              .then((text) => {
                hallName = text.trim();
              });
          }
        });
      }
    });

    cy.then(() => {
      expect(hallName).not.to.equal("");
    });

    cy.then(() => {
      cy.visit("/");
      cy.contains(mainPage.movieHallTitle, hallName).should("be.visible");
      cy.contains(mainPage.movieHallTitle, hallName)
        .parent()
        .find(mainPage.movieSeanceTimeEnabled)
        .first()
        .click();

      cy.url().should("include", "/client/hall.php");
      cy.get(hallPage.movieTitle).should("be.visible");
      cy.contains(hallPage.hallTitle, hallName).should("be.visible");
      cy.get(hallPage.availableChair).first().click();
      cy.get(hallPage.bookingButton).should("not.be.disabled");
      cy.get(hallPage.bookingButton).click();

      cy.url().should("include", "/client/payment.php");
      cy.get(paymentPage.title).should("be.visible");
      cy.contains(paymentPage.hallValue, hallName).should("be.visible");
      cy.get(paymentPage.costValue).should("be.visible");
    });
  });
});
