/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { uid } from './../fixtures/auth-user';

describe('App Navigation: Not logged in', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Arrives at loading page, AUTH', () => {
    cy.login();
    cy.visit('/').wait(1000);

    cy.contains('Ethics and Diversity Policy');
    cy.contains('Society for the Quantitative Analyses of Behavior');
    cy.contains('2022 Annual Conference');
    cy.contains('Invited Tutorials');

    cy.get('a.nav-link').should('have.length', 7);

    const dropDownItems = [5, 5, 4];
    let iterator = 0;

    cy.get('a.dropdown-toggle').each((ele) => {
      cy.wrap(ele).should('be.visible');
      cy.wrap(ele).click().wait(500);

      cy.get('a.dropdown-item').should('have.length', dropDownItems[iterator]);

      iterator++;
    });
  });

  it('Arrives at pages requiring auth, NO AUTH', () => {
    cy.visit('/submission').wait(1000);
    cy.contains('Submissions for Annual Conference');

    cy.visit(`/user/${uid}`).wait(1000);
    cy.contains('Edit Profile Information');

    cy.visit(`/manage/${uid}`).wait(1000);
    cy.contains('Recruitment Details');

    cy.visit(`/poster/${uid}`).wait(1000);
    cy.contains('Poster Details');
  });
});
