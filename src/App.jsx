import { useState } from "react";
import dayjs from "dayjs";
import ReactCalendar from "./calendar";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    current_date: dayjs(date).format("YYYY-MM-DD"),
    selected_date: dayjs(date).format("YYYY-MM-DD"),
    min_date: dayjs().subtract(4, "months").format("YYYY-MM-DD"),
    max_date: dayjs().add(4, "months").format("YYYY-MM-DD"),
  });
  console.log("min date", dayjs(formData.min_date).toDate());
  return (
    <>
      <>
        <form
          className='d-flex gap-2 my-2'
          onSubmit={(e) => {
            e.preventDefault();
            setFormData({
              current_date: e.target["current_date"]?.value,
              selected_date: e.target["selected_date"]?.value,
              min_date: e.target["min_date"]?.value,
              max_date: e.target["max_date"]?.value,
            });
            // console.log("submit", e.target["current_date"]?.value);
          }}
        >
          <div>
            <label htmlFor='current_date' className='form-label'>
              Current Date
            </label>
            <input
              id='current_date'
              name='current_date'
              type='date'
              // value={dayjs(date).format("YYYY-MM-DD")}
              defaultValue={formData.current_date}
              className='form-control'
              disabled
              // onChange={(e) => {
              //   console.log(e.target.value);
              // }}
              placeholder='Current Date'
            />
          </div>
          <div>
            <label htmlFor='selected_date' className='form-label'>
              Selected Date
            </label>
            <input
              type='date'
              placeholder='Selected Date'
              id='selected_date'
              name='selected_date'
              defaultValue={formData.selected_date}
              className='form-control'
            />
          </div>
          <div>
            <label htmlFor='min_date' className='form-label'>
              Min Date
            </label>
            <input
              type='date'
              placeholder='Min Date'
              id='min_date'
              name='min_date'
              defaultValue={formData.min_date}
              className='form-control'
            />
          </div>
          <div>
            <label htmlFor='max_date' className='form-label'>
              Max Date
            </label>
            <input
              type='date'
              placeholder='Max Date'
              id='max_date'
              name='max_date'
              defaultValue={formData.max_date}
              className='form-control'
            />
          </div>
          <div className='align-self-end'>
            <button className='btn btn-light' type='submit'>
              Submit
            </button>
          </div>
        </form>
        <div className='d-flex justify-content-center'>
          <ReactCalendar
            date={dayjs(formData.selected_date).toDate()}
            setDate={setDate}
            minDate={dayjs(formData.min_date).toDate()}
            maxDate={dayjs(formData.max_date).toDate()}
          />
        </div>
      </>
    </>
  );
};

export default App;

