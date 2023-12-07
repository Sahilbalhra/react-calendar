import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { createRoot } from "react-dom/client";

let root;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ReactCalendar = ({ date, setDate }) => {
  const currentDateRef = useRef();
  const daysref = useRef();
  const dateRef = useRef(dayjs());
  const currYear = useRef(dateRef.current.year());
  const currMonth = useRef(dateRef.current.month());

  const renderCalendar = () => {
    const firstDayofMonth = dateRef.current.date(1).day();
    const lastDateofMonth = dateRef.current.endOf("month").date();
    const lastDayofMonth = dateRef.current.endOf("month").day();
    const lastDateofLastMonth = dateRef.current
      .subtract(1, "month")
      .endOf("month")
      .date();

    const days = [];
    const todayDate = dayjs().toDate();

    for (let i = firstDayofMonth; i > 0; i--) {
      days.push(
        <li key={`prev-${i}`} className='react_calendar_inactive'>
          {lastDateofLastMonth - i + 1}
        </li>
      );
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === todayDate.getDate() &&
        currMonth.current === todayDate.getMonth() &&
        currYear.current === todayDate.getFullYear()
          ? "react_calendar_currenct_date"
          : "";
      const currentSelectedDate =
        i === date?.getDate() &&
        currMonth.current === date?.getMonth() &&
        currYear.current === date?.getFullYear()
          ? "react_calendar_active"
          : "";

      days.push(
        <li
          key={i}
          className={currentSelectedDate ? currentSelectedDate : isToday}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </li>
      );
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      days.push(
        <li key={`next-${i}`} className='react_calendar_inactive'>
          {i - lastDayofMonth + 1}
        </li>
      );
    }

    currentDateRef.current.innerHTML = `${months[currMonth.current]} ${
      currYear.current
    }`;
    if (!root) {
      root = createRoot(daysref.current);
    }
    root.render(<>{days}</>);
  };

  useEffect(() => {
    renderCalendar();
  }, [date]);

  const handleNextClick = () => {
    dateRef.current = dateRef.current.add(1, "month");
    currYear.current = dateRef.current.year();
    currMonth.current = dateRef.current.month();
    renderCalendar();
  };

  const handlePrevClick = () => {
    dateRef.current = dateRef.current.subtract(1, "month");
    currYear.current = dateRef.current.year();
    currMonth.current = dateRef.current.month();
    renderCalendar();
  };

  const handleDateClick = (day) => {
    const clickedDate = dayjs()
      .year(currYear.current)
      .month(currMonth.current)
      .date(day);
    setDate(clickedDate.toDate());
  };

  console.log("render")

  return (
    <div className='calendar_wrapper'>
      <header>
        <div className='calendar_icon' onClick={handlePrevClick}>
          <i className='bi bi-chevron-left'></i>
        </div>
        <p className='calendar_current_date' ref={currentDateRef}></p>
        <div className='calendar_icon' onClick={handleNextClick}>
          <i className='bi bi-chevron-right'></i>
        </div>
      </header>

      <div className='react_calendar'>
        <ul className='react_calendar_weeks'>
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className='react_calendar_days' ref={daysref}></ul>
      </div>
    </div>
  );
};

ReactCalendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func,
};

export default ReactCalendar;
