import React from 'react';
import { Content } from './content';
import { Agenda } from './Agenda';

export const ReactDOMStep: React.FC = () => (
  <>
    <Agenda />
    <main className="main">
      <div className="sb-content">
        <Content />
      </div>
      <footer className="sb-footer">
        {new Date().getFullYear()} &copy; ServiceBridge
      </footer>
    </main>
  </>
)