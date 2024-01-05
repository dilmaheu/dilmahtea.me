export default function handleEmptyFields(obj) {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      obj[key] = "N/A";
    } else if (obj[key].constructor === Object) {
      handleEmptyFields(obj[key]);
    }
  });

  return obj;
}
