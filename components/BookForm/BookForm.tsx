'use client';
import { useEffect, useState } from 'react';
import css from './BookForm.module.css';
import Calendar from '../Calendar/Calendar';

interface BookFormProps {
  handleSubmit: () => void;
  resetKey?: number;
}

export default function BookForm({ handleSubmit, resetKey }: BookFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    setSelectedDate(undefined);
  }, [resetKey]);

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

        <Calendar onSelect={setSelectedDate} selectedDate={selectedDate} />

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
