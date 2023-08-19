const currentTime = () => {
  const date = new Date();

  const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const period = date.getHours() < 12 ? "AM" : "PM";

  return `${hours}:${minutes}:${seconds} ${period}`;
};

export default function printMessage(type, message) {
  console.log(
    "\x1b[30m" + currentTime() + "\x1b[0m",
    "\x1b[1m" + "\x1b[32m" + "[dilmah]" + "\x1b[0m",
    (type === "error" ? "\x1b[31m" : "\x1b[36m") + type + "\x1b[0m",
    message,
  );
}
