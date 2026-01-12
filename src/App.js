import './App.css';

import YearView from './components/Year';
import YearMonth from './components/YearMonth';
import { useEffect, useState } from 'react';

function App() {
  const [view, setView] = useState(null);
  useEffect(() => {
    if (window && window.location.search) {
      setView(decodeURIComponent(window.location.search.replace('?view=', ''))); 
    }
  }, []);
  return (
    <div className="App">
      <div className="year">
        { view === 'year' &&
        <YearView/> }
      </div>
      <div className="year-month">
        {view === 'year-month' &&
        <YearMonth/> }
      </div>
    </div>
  );
}

export default App;
