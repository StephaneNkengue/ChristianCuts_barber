import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { DayPickerProps } from "react-day-picker";

export function Calendar(props: DayPickerProps) {
  return <DayPicker {...props} />;
}
