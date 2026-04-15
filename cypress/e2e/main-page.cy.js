describe("Main page rendering", () => {
  beforeEach(() => {
    cy.fixture("selectors").as("selectors");
  });

  it("displays the main page with schedule, movies and sessions", function () {
    const { mainPage } = this.selectors;

    cy.visit("/");

    cy.get(mainPage.headerTitle).should("be.visible");
    cy.get(mainPage.navDay).should("have.length", 7);
    cy.get(mainPage.navDayChosen).should("have.length", 1);
    cy.get(mainPage.movieCard).should("have.length.at.least", 1);
    cy.get(mainPage.movieTitle).first().should("be.visible").and("not.be.empty");
    cy.get(mainPage.movieDescription).first().should("be.visible");
    cy.get(mainPage.moviePoster).first().should("be.visible");
    cy.get(mainPage.movieHallTitle).first().should("be.visible");
    cy.get(mainPage.movieSeanceTime).first().should("be.visible");
  });
});
