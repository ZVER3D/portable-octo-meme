import { CssBaseline } from '@material-ui/core';
import 'katex/dist/katex.min.css';
import React from 'react';
import { render } from 'react-dom';
import Result from './pages/Result';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');

const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute(
  'href',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
);

const meta = document.createElement('meta');
meta.setAttribute('name', 'viewport');
meta.setAttribute(
  'content',
  'minimum-scale=1, initial-scale=1, width=device-width'
);

document.head.appendChild(meta);
document.head.appendChild(link);
document.body.appendChild(mainElement);

const App = () => {
  return (
    <>
      <CssBaseline />
      <Result />
    </>
  );
};

render(<App />, mainElement);
