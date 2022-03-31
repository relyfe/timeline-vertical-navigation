import timelineVerticalNavigation from "../src/index.js";

const t = timelineVerticalNavigation;
t.init({
  container: document.getElementsByTagName("main")[0],
});

t.setDates([
  new Date("03-01-2022"),
  new Date("02-01-2022"),
  new Date("02-22-2022"),
  new Date("05-19-2015"),
]);
