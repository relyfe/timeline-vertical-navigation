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

  return { init };
};

export default TimelineVerticalNavigation();
