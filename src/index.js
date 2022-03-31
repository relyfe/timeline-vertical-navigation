import markup from "./markup.js";
import style from "./style.js";
const TimelineVerticalNavigation = () => {
  const init = ({
    container = document.body,
    element = document.createElement("div"),
    zIndex = 10,
  }) => {
    injectStyle({ container });
    const { nav, tvnInner } = initMarkup({ container, element, zIndex });
    initDateUnderline({ tvnInner });
  };

  const injectStyle = ({ container }) => {
    const styleNode = document.createElement("style");
    styleNode.innerHTML = style;
    container.appendChild(styleNode);
  };

  const initMarkup = ({ container, element, zIndex }) => {
    element.classList.add("tvn-element");
    element.innerHTML = markup;
    container.appendChild(element);
    const nav = document.getElementsByClassName("tvn-nav")[0];
    nav.style.zIndex = zIndex;
    return { nav, tvnInner: document.getElementsByClassName("tvn-inner")[0] };
  };

  const initDateUnderline = ({ tvnInner }) => {
    const dateUnderline = document.getElementsByClassName(
      "tvn-current-date-underline"
    )[0];
    tvnInner.addEventListener("mousemove", (e) => {
      dateUnderline.style.transform = `translateY(${e.offsetY}px)`;
    });
  };

  const setDates = (dates) => {
    const tvnList = document.getElementsByClassName("tvn-list")[0];
    let previousYear, previousMonth;
    dates
      .sort((a, b) => (a - b > 0 ? 1 : -1))
      .map((date) => {
        const month = date.getMonth();
        const year = date.getYear();
        console.log(date);
        console.log(month);
        if (month != previousMonth || year != previousYear) {
          console.log("add", month, year);
          //tvnList.appendChild(tvnMonth)
        }
        previousYear = year;
        previousMonth = month;
      });
  };

  return { init, setDates };
};

export default TimelineVerticalNavigation();
