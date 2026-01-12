import dayjs from 'dayjs';
import './index.css'
import { useEffect, useState } from 'react';

function GoalView({ mode }) {
  const [target, setTarget] = useState(null);
  const [daysTillTarget, setDaysTillTarget] = useState([]);
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const now = dayjs();

    if (window && window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      const paramsObject = Object.fromEntries(searchParams.entries());

      setTarget(paramsObject.target);
      setGoal(paramsObject.goal || '');

      // get all days in current year
      const startOfYear = now.startOf('year');
      const endOfYear = now.endOf('year');
      const _daysTillTarget = [];
      for (let date = startOfYear; date.isBefore(dayjs(paramsObject.target)) || date.isSame(dayjs(paramsObject.target)); date = date.add(1, 'day')) {
        _daysTillTarget.push(date.format('YYYY-MM-DD'));
      }
      setDaysTillTarget(_daysTillTarget);
    }
  }, []);


  useEffect(() => {
    if (target) {
      const targetDate = dayjs(target);
    
      // days left until target date
      const now = dayjs();
      const daysLeft = targetDate.diff(now, 'day');
      console.log(`Days left until ${target}:`, daysLeft);
    }
  }, [target]);

  return (
    <>
      <div className={`calendar ${mode}`}>
        {daysTillTarget.map((date) => (
          <div
            key={date}
            className={`day-cell ${date === dayjs().format('YYYY-MM-DD') ? 'current-day' : ''} ${date < dayjs().format('YYYY-MM-DD') ? 'past-day' : 'future-day'}`}
            title={date}
          >
          </div>
        ))}
      </div>
      {/* days left */}
      <p className="goal-title">{goal}</p>
      <p>
        {daysTillTarget.length - daysTillTarget.indexOf(dayjs().format('YYYY-MM-DD')) - 1} days left - 
        {/* percent of passed  */}
        <span>
        { daysTillTarget.length > 0 &&
          (` ${parseInt(((daysTillTarget.indexOf(dayjs().format('YYYY-MM-DD')) + 1) / daysTillTarget.length * 100))}%`)
        }
        </span>
      </p>
    </>
  );
}

export default GoalView;