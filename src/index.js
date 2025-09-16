import React from 'react';
import ReactDOM from 'react-dom/client';
import {unstableSetRender} from 'antd';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

unstableSetRender((node, container) => {
  container._reactRoot ||= ReactDOM.createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
