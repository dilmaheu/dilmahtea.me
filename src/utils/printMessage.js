const currentTime = () => {
  const date = new Date();

  let hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    period = hours < 12 ? "AM" : "PM";

  hours = hours % 12 || 12;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const currentTime = `${hours}:${minutes}:${seconds} ${period}`;

  return currentTime;
};

export default function printMessage(type, message) {
  console.log(
    "\x1b[30m" + currentTime() + "\x1b[0m",
    "\x1b[1m" + "\x1b[32m" + "[dilmah]" + "\x1b[0m",
    (type === "error" ? "\x1b[31m" : "\x1b[36m") + type + "\x1b[0m",
    message
  );
}
