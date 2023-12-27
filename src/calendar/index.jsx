import React, { useEffect, useRef, useState, useCallback } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

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

const ReactCalendar = React.memo(({ date, setDate, minDate, maxDate }) => {
  const [daysTab, setDaysTab] = useState(null);
  const currentDateRef = useRef();
  const dateRef = useRef(dayjs());
  const currYear = useRef(dateRef.current.year());
  const currMonth = useRef(dateRef.current.month());

  const renderCalendar = useCallback(() => {
    const firstDayofMonth = dateRef.current.date(1).day();
    const lastDateofMonth = dateRef.current.endOf("month").date();
    const lastDayofMonth = dateRef.current.endOf("month").day();
    const lastDateofLastMonth = dateRef.current
      .subtract(1, "month")
      .endOf("month")
      .date();
    let daysEleData = [];
    const todayDate = dayjs().toDate();

    for (let i = firstDayofMonth; i > 0; i--) {
      daysEleData.push({
        class: "react_calendar_inactive",
        day: lastDateofLastMonth - i + 1,
      });
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

      const isMinDate =
        currYear.current < minDate.getFullYear()
          ? "react_calendar_inactive"
          : currMonth.current < minDate.getMonth() &&
            currYear.current <= minDate.getFullYear()
          ? "react_calendar_inactive"
          : i < minDate.getDate() && currMonth.current === minDate.getMonth()
          ? "react_calendar_inactive"
          : "";

      const isMaxDate =
        currYear.current > maxDate.getFullYear()
          ? "react_calendar_inactive"
          : currMonth.current > maxDate.getMonth() &&
            currYear.current >= maxDate.getFullYear()
          ? "react_calendar_inactive"
          : i > maxDate.getDate() && currMonth.current === maxDate.getMonth()
          ? "react_calendar_inactive"
          : "";

      daysEleData.push({
        class: isMinDate
          ? isMinDate
          : isMaxDate
          ? isMaxDate
          : currentSelectedDate
          ? currentSelectedDate
          : isToday,
        day: i,
        activeMonth: true,
      });
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      daysEleData.push({
        class: "react_calendar_inactive",
        day: i - lastDayofMonth + 1,
      });
    }

    currentDateRef.current.innerHTML = `${months[currMonth.current]} ${
      currYear.current
    }`;
    setDaysTab(daysEleData);
  }, [date]);

  useEffect(() => {
    renderCalendar();
  }, [date, renderCalendar]);

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
  return (
    <div className='calendar_wrapper'>
      <header>
        <div
          className='calendar_icon'
          onClick={() => {
            if (
              currMonth.current <= minDate.getMonth() &&
              currYear.current <= minDate.getFullYear()
            ) {
              //
            } else {
              handlePrevClick();
            }
          }}
        >
          <i className='bi bi-chevron-left'></i>
        </div>
        <p className='calendar_current_date' ref={currentDateRef}></p>
        <div
          className='calendar_icon'
          onClick={() => {
            if (
              currMonth.current >= maxDate.getMonth() &&
              currYear.current >= maxDate.getFullYear()
            ) {
              //
            } else {
              handleNextClick();
            }
          }}
        >
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
        <ul className='react_calendar_days'>
          {daysTab &&
            daysTab.map((ele, index) => (
              <li
                key={index}
                className={ele.class}
                onClick={() => ele.activeMonth && handleDateClick(ele.day)}
              >
                {ele.day}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
});

ReactCalendar.displayName = "ReactCalendar";

ReactCalendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
};

export default ReactCalendar;
