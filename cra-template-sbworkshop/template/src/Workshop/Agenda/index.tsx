import React from 'react';
import SBLogo from '../../assets/sb-logo.svg';
import './Agenda.css';

export const Agenda: React.FC = () => (
  <aside className="agenda">
    <img className="sb-logo" src={SBLogo} alt="SB Workshop" />
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