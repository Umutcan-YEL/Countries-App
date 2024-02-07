export const HandleWidth = () => {
  if (window.innerWidth < 800) {
    return 10;
  } else if (window.innerWidth >= 801 && window.innerWidth < 1600) {
    return 11;
  } else if (window.innerWidth >= 1601 && window.innerWidth < 2000) {
    return 13;
  } else {
    return 17;
  }
};
