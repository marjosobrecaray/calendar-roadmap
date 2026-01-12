import './App.css';

import YearView from './components/Year';
import YearMonth from './components/YearMonth';
import GoalView from './components/Goal';
import { useEffect, useState } from 'react';

function App() {
  const [view, setView] = useState('year');
  const [mode, setMode] = useState('light');

  useEffect(() => {
    // to objectify view and mode from url params
    if (window && window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      const paramsObject = Object.fromEntries(searchParams.entries());
      
      setView(paramsObject.view || 'year'); 
      setMode(paramsObject.mode || 'light');
    }
  }, []);
  return (
    <div className={`app ${mode}`} id="app">
      <div className="year">
        { view === 'year' &&
        <YearView mode={mode} /> }
      </div>
      { view === 'goal' &&
        <div className="goal">
          <GoalView mode={mode} />
        </div>
      }
      <div className="year-month">
        {view === 'year-month' &&
        <YearMonth/> }
      </div>
    </div>
  );
}

export default App;
