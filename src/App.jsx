import { useState } from "react";
import dayjs from "dayjs";
import ReactCalendar from "./calendar";

const App = () => {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <input
        type='text'
        disabled
        value={dayjs(date).format('MMM DD,YYYY')}
        style={{ marginBottom: "24px", padding: "5px",width:"440px" }}
      />
      <ReactCalendar date={date} setDate={setDate} />
    </>
  );
};

export default App;
