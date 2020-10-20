import React from 'react';
import ReactDOM from 'react-dom';
import './vendors/normalize.css';
import './index.css';
import { Agenda } from './Workshop/Agenda';
import { Content } from './components/content';

ReactDOM.render(
  <React.StrictMode>
    <>
      <Agenda />
      <main className="main">
        <h1 className="sb-title">
          React Basics Workshop
        </h1>
        <div className="sb-content">
          <Content />
        </div>
        <footer className="sb-footer">
          {new Date().getFullYear()} &copy; ServiceBridge. All Rights Reserved.
        </footer>
      </main>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);