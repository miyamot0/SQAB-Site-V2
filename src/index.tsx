/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'handsontable/dist/handsontable.full.css';

import App from './App';

import './index.css';
import { AuthorizationContextProvider } from './context/AuthorizationContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AuthorizationContextProvider>
      <App />
    </AuthorizationContextProvider>
  </React.StrictMode>,
);
