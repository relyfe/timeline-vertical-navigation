export default `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
.tvn-nav {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 36px;
}
.tvn-inner {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 56px;
}
.tvn-list {
    position: absolute;
    top: 24px;
    bottom: 24px;
    right: 10px;
}
.tvn-current-date-underline {
    background: #1a73e8;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    height: 2px;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity .15s linear;
    width: 72px;
    z-index: 1;
}
.tvn-current-time-line {
    background: #1a73e8;
    height: 1px;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 24px;
    width: 40px;
    z-index: 1;
}
.tvn-current-date {
    display: flex;
    height: 48px;
    pointer-events: none;
    position: absolute;
    right: 0;
    transition: opacity .15s linear;
}
.tvn-current-date-label {
    background: hsla(0,0%,100%,.9);
    box-sizing: border-box;
    border-radius: 2px;
    color: #3c4043;
    height: 24px;
    min-width: 0;
    padding: 2px 10px;
    pointer-events: none;
    text-align: center;
    user-select: none;
    white-space: nowrap;
    font-family: Roboto,Arial,sans-serif;
    line-height: 1.25rem;
    font-size: .875rem;
    letter-spacing: .0178571429em;
    font-weight: 500;
}
`;
