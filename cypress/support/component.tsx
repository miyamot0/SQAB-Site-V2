// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import { mount } from 'cypress/react';
import { projectAuth } from '../../src/firebase/config';
import { email, password } from '../fixtures/auth-user';
import React from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(): void;
      logout(): void;
      saveLocalStorage(): void;
      restoreLocalStorage(): void;
      mount: typeof mount;
      mount2(element: JSX.Element): unknown;
    }
  }
}

// eslint-disable-next-line prefer-const
let LOCAL_STORAGE_MEMORY: any = {};

Cypress.Commands.add('mount', mount);

Cypress.Commands.add('mount2', (element: JSX.Element) => {
  const modLoad = <div>{element}</div>;
  //const root = ReactDOM.createRoot(document.getElementById('root')!);
  return mount(modLoad);
});

Cypress.Commands.add('login', () => {
  return projectAuth.signInWithEmailAndPassword(email, password);
});

Cypress.Commands.add('logout', () => {
  return projectAuth.signOut();
});

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
