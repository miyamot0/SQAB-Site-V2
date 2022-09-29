/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('App Navigation: Not logged in', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Arrives at loading page, NO AUTH', () => {
    cy.visit('/').wait(1000);

    cy.contains('Ethics and Diversity Policy');
    cy.contains('Society for the Quantitative Analyses of Behavior');
    cy.contains('2022 Annual Conference');
    cy.contains('Invited Tutorials');

    cy.get('a.nav-link').should('have.length', 7);

    cy.get('a.dropdown-toggle').each((ele) => {
      cy.wrap(ele).should('be.visible');
      cy.wrap(ele).click().wait(500);

      cy.get('a.dropdown-item').should('have.length', 5);
    });
  });

  it('Arrives at pages requiring auth, NO AUTH', () => {
    cy.visit('/submission').wait(1000);
    // Should redirect!
    cy.contains('Site Authentication');
    cy.contains('Current Status: Not authenticated');

    cy.visit('/user/0').wait(1000);
    // Should redirect!
    cy.contains('Site Authentication');
    cy.contains('Current Status: Not authenticated');

    cy.visit('/user/0').wait(1000);
    // Should redirect!
    cy.contains('Site Authentication');
    cy.contains('Current Status: Not authenticated');

    cy.visit('/manage/0').wait(1000);
    // Should redirect!
    cy.contains('Site Authentication');
    cy.contains('Current Status: Not authenticated');

    cy.visit('/admin').wait(1000);
    // Should redirect!
    cy.contains('Site Authentication');
    cy.contains('Current Status: Not authenticated');
  });

  it('Arrives at conference page, NO AUTH', () => {
    cy.visit('/conference').wait(1000);

    cy.contains('Annual Conference');
  });

  it('Arrives at tutorials page, default, NO AUTH', () => {
    cy.visit('/tutorials/-1').wait(1000);

    cy.contains('SQAB Pre-eminent Tutorials');
    cy.contains('Available Tutorials');

    cy.get('ul.tutorials-ul > li > a')
      .first()
      .should(
        'have.text',
        'Paul Soto, Using Genetically Modified Organisms to Probe Neurobiological Bases of Behavior, SQAB',
      )
      .click();

    cy.contains(
      'Paul Soto, Using Genetically Modified Organisms to Probe Neurobiological Bases of Behavior, SQAB',
    );
    cy.contains('Chair: Jesse Dallery (University of Florida);');
  });

  it('Arrives at registration page, NO AUTH', () => {
    cy.visit('/registration').wait(1000);

    cy.contains('SQAB Membership and Registration (2022)');
    cy.contains('Ethics and Diversity Policy');
  });

  it('Arrives at records page, NO AUTH', () => {
    cy.visit('/records').wait(1000);
    cy.contains('Yearly Programs and Newsletters');
    cy.contains('Previous Programs');
    cy.contains('Previous Newsletters');
  });

  it('Arrives at demand page [NOT TESTED], NO AUTH', () => {
    cy.visit('/demand').wait(1000);
    cy.contains('Demand Curve Analyzer');
    cy.contains('Exponential Model');
    cy.contains('Log Range');
    cy.contains('Load Example Data');
    cy.contains('Calculate');
    cy.contains('Fitting Results');
  });

  it('Arrives at discounting page [NOT TESTED], NO AUTH', () => {
    cy.visit('/discounting').wait(1000);
    cy.contains('Discounting Model Selector');
    cy.contains('Do Not Bound');
    cy.contains('Load Example Data');
    cy.contains('Calculate');
    cy.contains('Fitting Results');
  });

  it('Arrives at PMAX page [NOT TESTED], NO AUTH', () => {
    cy.visit('/pmax').wait(1000);
    cy.contains('Analytical PMAX Calculator');
    cy.contains('PMAX Calculator');
    cy.contains('Load Example Data');
    cy.contains('Calculate');
    cy.contains('PMAX Output Logs');
  });

  it('Arrives at resources page, NO AUTH', () => {
    cy.visit('/resources').wait(1000);
    cy.contains('SQAB Resources');
    cy.contains('Labs and Tools');
    cy.contains('Current Labs');
    cy.contains('Peer-reviewed Tools');
    cy.contains('Books and Software');
    cy.contains('Books, Special Issues');
    cy.contains('Computer Software');
  });

  it('Arrives at behavioralprocesses page, NO AUTH', () => {
    cy.visit('/behavioralprocesses').wait(1000);

    cy.contains('Special Issues from The Society for the Quantitative Analyses of Behavior');
    cy.contains('Available Issues');

    cy.get('ul.beproc-ul > li > a')
      .first()
      .contains('Proceedings of SQAB 2000: The longer view, Behavioural Processes, 54(1), 1-174');
  });

  it('Arrives at executiveboard page [NOT TESTED], NO AUTH', () => {
    cy.visit('/executiveboard').wait(1000);
    cy.contains('Leadership and Executive Board (2021-2022)');
    cy.contains('Current Leadership');
    cy.contains('Board Members/Board Directors');
    cy.contains('Board Officers');
    cy.contains('Past Leadership');
    cy.contains('Past Board Members');
    cy.contains('Past President');
  });

  it('Arrives at recruitment page, NO AUTH', () => {
    cy.visit('/recruitment').wait(1000);
    cy.contains('Current and Upcoming Graduate Student Opportunities');
    cy.get('tr.recruitment-table-tr').should('have.length.at.least', 1);
  });

  it('Triggers modals, NO AUTH', () => {
    cy.get('a.nav-link').filter(':contains("Listserv")').click().wait(1000);

    cy.get('h2').filter(':contains("Listserv")').should('exist');
    cy.get('button.button-close-modal').filter(':visible').should('exist').click();

    cy.get('a.nav-link').filter(':contains("Privacy")').click().wait(1000);

    cy.get('h2').filter(':contains("Privacy")').should('exist');
    cy.get('button.button-close-modal').filter(':visible').should('exist').click();
  });
});
