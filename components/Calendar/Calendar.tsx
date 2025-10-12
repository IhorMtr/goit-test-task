'use client';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import css from './Calendar.module.css';
import { enGB } from 'date-fns/locale';

interface CalendarProps {
  onSelect: (date: Date | undefined) => void;
  selectedDate?: Date;
}

export default function Calendar({ onSelect, selectedDate }: CalendarProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
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
            locale={enGB}
            onSelect={day => {
              onSelect(day);
              setCalendarOpen(false);
            }}
            formatters={{
              formatWeekdayName: day => format(day, 'EEE').toUpperCase(),
            }}
            showOutsideDays
            classNames={{
              root: css.dayPicker,
              months: css.months,
              month: css.month,
              month_caption: css.monthCaption,
              weekdays: css.weekdays,
              caption: css.caption,
              caption_label: css.captionLabel,
              nav: css.nav,
              nav_button: css.navButton,
              nav_button_previous: css.navButtonPrev,
              nav_button_next: css.navButtonNext,
              table: css.table,
              tbody: css.tbody,
              head: css.head,
              head_row: css.headRow,
              head_cell: css.headCell,
              row: css.row,
              cell: css.cell,
              day: css.day,
              day_selected: css.daySelected,
              day_today: css.dayToday,
              day_outside: css.dayOutside,
              day_disabled: css.dayDisabled,
              footer: css.footer,
              button_previous: css.button_previous,
              button_next: css.button_next,
              chevron: css.chevron,
              weeks: css.weeks,
              day_button: css.day_button,
              today: css.today,
              outside: css.outside,
              month_grid: css.month_grid,
              weekday: css.weekday,
            }}
          />
        </div>
      )}
    </div>
  );
}
