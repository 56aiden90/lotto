import moment from "moment";
import { PickerLocale } from "antd/lib/date-picker/generatePicker";
moment.locale("ko");

export const locale: PickerLocale = {
  lang: {
    locale: "ko",
    placeholder: "날짜 선택",
    rangePlaceholder: ["시작일", "종료일"],
    today: "오늘",
    now: "지금",
    backToToday: "오늘로 돌아가기",
    ok: "확인",
    clear: "초기화",
    month: "월",
    year: "년",
    timeSelect: "시간 선택",
    dateSelect: "날짜 선택",
    monthSelect: "월 선택",
    yearSelect: "년도 선택",
    decadeSelect: "년대 선택",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "이전 달 (PageUp)",
    nextMonth: "다음 달 (PageDown)",
    previousYear: "이전 년도 (Control + left)",
    nextYear: "다음 년도 (Control + right)",
    previousDecade: "이전 년대",
    nextDecade: "다음 년대",
    previousCentury: "이전 세기",
    nextCentury: "다음 세기",
  },
  timePickerLocale: {
    placeholder: "시간을 선택해주세요.",
  },
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
};
