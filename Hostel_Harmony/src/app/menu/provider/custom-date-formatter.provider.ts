import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek, getMonth } from 'date-fns';
import { DatePipe } from '@angular/common';

export class CustomDateFormatter extends CalendarDateFormatter {
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    const monthName: number = getMonth(date)+1;// new DatePipe(locale).transform(date, 'm', locale);
    return `חודש ${monthName} שנה ${year}`;
  }
}