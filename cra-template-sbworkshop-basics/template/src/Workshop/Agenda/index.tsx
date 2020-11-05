import React from 'react';
import './Agenda.css';

export const Agenda: React.FC = () => (
  <aside className="agenda">
    <h1 className="sb-title">React Basics 🚀</h1>
    <h3>Agenda:</h3>
    <ol>
      <li>Creating a component</li>
      <li>Importing assets/stylesheets</li>
      <li>Lazy importing react components</li>
      <li>
        Basic React Hooks:
        <ol>
          <li>
            <code>useState</code>
          </li>
          <li>
            <code>useEffect</code>
          </li>
          <li>
            <code>useCallback</code>
          </li>
          <li>
            <code>useRef</code>
          </li>
          <li>
            <code>useMemo</code>
          </li>
          <li>
            <code>useCustomHook</code>
          </li>
        </ol>
      </li>
      <li>
        <code>memo</code> helper
      </li>
      <li>
        React Dev Tools
      </li>
    </ol>
  </aside>
);