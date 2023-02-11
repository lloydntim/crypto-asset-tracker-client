import * as React from 'react';
import {render} from 'react-dom';

import './i18n';

import {App} from './App';

import './localisation/i18n';

const container = document.getElementById('root');
const root = createRoot(container);

/* eslint-disable no-undef */
render(<App />, document.getElementById('root'));
