export const HandleWidth = () => {
  const width = window.innerWidth;
  if (width < 800) {
    return 5;
  } else if (width >= 801 && width < 1600) {
    return 9;
  } else if (width >= 1601 && width < 2000) {
    return 13;
  } else {
    return 17;
  }
};
