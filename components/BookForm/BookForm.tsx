import { useState } from 'react';
import css from './BookForm.module.css';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

interface BookFormProps {
  handleSubmit: () => void;
}

export default function BookForm({ handleSubmit }: BookFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  return (
    <div className={css.formWrapper}>
      <div className={css.formTextWrapper}>
        <h2 className={css.formTitle}>Book your campervan now</h2>
        <p className={css.formText}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form className={css.form} action={handleSubmit}>
        <label className={css.label}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            className={css.input}
            required
          />
        </label>

        <label className={css.label}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            className={css.input}
            required
          />
        </label>

        <div className={css.datePickerWrapper}>
          <input
            type="text"
            name="bookingDate"
            placeholder="Booking date*"
            className={css.input}
            value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
            readOnly
            required
            onClick={() => setCalendarOpen(!calendarOpen)}
          />
          {calendarOpen && (
            <div className={css.calendarPopup}>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={day => {
                  setSelectedDate(day);
                  setCalendarOpen(false);
                }}
              />
            </div>
          )}
        </div>

        <label className={css.label}>
          <textarea
            name="comment"
            placeholder="Comment"
            className={css.textarea}
          />
        </label>

        <button type="submit" className={css.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
}
