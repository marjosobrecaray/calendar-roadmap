import dayjs from 'dayjs';
import './index.css'
import { useEffect, useState } from 'react';

function YearMonthView() {
  const [currentDate, setCurrentDate] = useState(null);
  const [months, setMonths] = useState([]);
  const [daysInYear, setDaysInYear] = useState([]);

  useEffect(() => {
    const now = dayjs();
    // setCurrentDate(now.format('YYYY-MM-DD'));
    setCurrentDate(now.format('YYYY-MM-DD'));

    // get all months in a year
    const startOfYear = now.startOf('year');
    let _months = [];
    for (let month = 0; month < 12; month++) {
      _months.push({
        month: month,
        days: []
      })
      const startOfMonth = startOfYear.add(month, 'month');
      const endOfMonth = startOfMonth.endOf('month');
      for (let date = startOfMonth; date.isBefore(endOfMonth) || date.isSame(endOfMonth); date = date.add(1, 'day')) {
        // get weekday number (0-6) and add empty days if needed
        // get weekday number (0-6)
        dayjs.extend(require('dayjs/plugin/weekday'));
        const weekday = date.weekday(); // 0 (Sunday) to 6 (Saturday)
        // add empty days for the first week
        if (date.date() === 1) {
          for (let i = 0; i < weekday; i++) {
            _months[month].days.push(null);
          }
        }
        _months[month].days.push(date.format('YYYY-MM-DD'));
      }
    }

    setMonths(_months);

    setDaysInYear(_months.reduce((acc, month) => {
      const _days = []
      month.days.forEach(day => {
        if (day) {
          _days.push(day);
        }
      });
      return acc.concat(_days);
    }, []));

    console.log(_months);
  }, []);

  return (
    <>
      <div className="calendar">
        {months.map(({month, days}) => (
          <div key={month} className="month-block">
            <p>{dayjs().month(month).format('MMMM')}</p>
            <div className="month-days">
              { days.map((date, index) => {
                return date ? (
                  <div
                    key={date}
                    className={`day-cell ${date === currentDate ? 'current-day' : ''} ${date < currentDate ? 'past-day' : 'future-day'}`}
                    title={date}
                  >
                  </div>
                ) : (
                  <div
                    key={`empty-${index}`}
                    className="day-cell empty-day"
                  >
                  </div>
                )
              })}
            </div>
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

export default YearMonthView;