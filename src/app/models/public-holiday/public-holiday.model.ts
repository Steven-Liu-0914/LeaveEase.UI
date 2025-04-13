export interface PublicHolidayDto {
    id: number;
    name: string;
    date: string;     // Format: YYYY-MM-DD
    day: string;      // e.g. "Monday", auto-derived from date
  }
  