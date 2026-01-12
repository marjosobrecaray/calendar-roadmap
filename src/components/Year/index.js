import dayjs from 'dayjs';
import './index.css'
import { useEffect, useState } from 'react';

function YearView({ mode }) {
  const [currentDate, setCurrentDate] = useState(null);
  const [daysInYear, setDaysInYear] = useState([]);

  useEffect(() => {
    const now = dayjs();
    setCurrentDate(now.format('YYYY-MM-DD'));

    // get all days in current year
    const startOfYear = now.startOf('year');
    const endOfYear = now.endOf('year');
    const _daysInYear = [];
    for (let date = startOfYear; date.isBefore(endOfYear) || date.isSame(endOfYear); date = date.add(1, 'day')) {
      _daysInYear.push(date.format('YYYY-MM-DD'));
    }
    setDaysInYear(_daysInYear);
  }, []);

  return (
    <>
      <div className={`calendar ${mode}`}>
        {daysInYear.map((date) => (
          <div
            key={date}
            className={`day-cell ${date === currentDate ? 'current-day' : ''} ${date < currentDate ? 'past-day' : 'future-day'}`}
            title={date}
          >
          </div>
        ))}
      </div>
      {/* days left */}
      <p>
        {daysInYear.length - daysInYear.indexOf(currentDate) - 1} days left - 
        {/* percent of passed  */}
        <span>
        { daysInYear.length > 0 &&
          (` ${parseInt(((daysInYear.indexOf(currentDate) + 1) / daysInYear.length * 100))}%`)
        }
        </span>
      </p>
    </>
  );
}

export default YearView;