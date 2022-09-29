import React from "react"
import Home from "../../src/pages/home/Home";

describe('Home.cy.tsx', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Should successfully log in', () => {
    cy.login();
    // Probe the landing page
    cy.mount(<Home />)
  })
})