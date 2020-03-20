/* eslint-disable linebreak-style */
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const meridiems = [
  'AM',
  'PM',
];

export default {
  months,
  days,
  meridiems,
  /**
   * utcNumber - should be derived from Date.now()
   * format - write/implement your own format on the switch case below.
   *          use any of those words for this parameter.
   * timezoneOffset - should be derived from Date.getTimezoneOffset(), offsets are optional.
   *                  if you want the time adjusted to specific timezone.
   *                  Sample:
   *                    Save with GMT+8 on March 12, 8 AM (local timezone) but saved in utcNumber,
   *                    but another viewer on GMT-8 sees it as March 11, 4 PM but he want's to know
   *                    your exact time. Since the data stored on DB has utcNumber
   *                    and timezoneOffset, the other viewer can simply:
   *                    // with timezoneOffset from DB
   *                    format('some format', utcNumber, timezoneOffset). // March 12, 8 AM
   *                    // no timezoneOffset
   *                    format('some format', utcNumber). // March 11, 4 PM
   * */
  format(utcNumber, format, timezoneOffset) {
    const offsetMinutes = timezoneOffset ? timezoneOffset * 60000 : 0;
    const dateTime = new Date(utcNumber - offsetMinutes);
    const hour24 = timezoneOffset ? dateTime.getUTCHours() : dateTime.getHours();
    const hour12 = hour24 % 12;

    const year = timezoneOffset ? dateTime.getUTCFullYear() : dateTime.getFullYear(); // 2020
    const month = timezoneOffset ? dateTime.getUTCMonth() : dateTime.getMonth(); // 0 = January
    const day = timezoneOffset ? dateTime.getUTCDay() : dateTime.getDay(); // 0 = Sunday
    const date = timezoneOffset ? dateTime.getUTCDate() : dateTime.getDate(); // 1 - 31*
    const hour = hour12 === 0 ? 12 : hour12; // 1 - 12
    const meridiem = hour24 > 10 ? 1 : 0; // 0 = AM
    const minute = timezoneOffset ? dateTime.getUTCMinutes() : dateTime.getMinutes(); // 0 - 59
    // const second = timezoneOffset ? dateTime.getUTCSeconds() : dateTime.getSeconds(); // 0 - 59

    const def = (
      `${days[day]} ${months[month]} ${date}, ${year} @ ${hour}:${minute} ${meridiems[meridiem]}`
    );

    switch (format) {
      case 'formal': return def;
      default: return def;
    }
  },
};
