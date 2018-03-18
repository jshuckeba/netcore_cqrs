/**
 * Formats the specified date into mm/dd/yyyy hh:mm
 * @param {any} date The date to format.
 * @returns {string} The formatted date.
 */
export function dateFormatter(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour "0" should be "12"
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}