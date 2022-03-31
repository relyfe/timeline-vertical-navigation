import { Component, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'timeline-vertical-navigation',
  styleUrl: 'timeline-vertical-navigation.css',
  shadow: true,
})
export class TimelineVerticalNavigation {
  navElement!: HTMLElement;
  currentDateUnderlineElement!: HTMLElement;
  currentDateElement!: HTMLElement;
  datesArray: Date[];

  @State() show: boolean = false;

  @Prop() dates!: string;
  @Prop() darkmode: boolean = false;

  componentWillLoad() {
    this.parseDates();
  }
  @Watch('dates')
  parseDates() {
    if (this.dates) {
      this.datesArray = this.dates
        .replace('[', '')
        .replace(']', '')
        .replace(', ', ',')
        .split(',')
        .map(date => new Date(date));
    }
  }

  onTvnInnerMouseMove = e => {
    const currentDateHeight = this.currentDateElement.clientHeight;
    const translateY = Math.min(Math.max(e.offsetY - currentDateHeight, 0), this.navElement.clientHeight - currentDateHeight * 2);
    this.currentDateUnderlineElement.style.transform = this.currentDateElement.style.transform = `translateY(${translateY}px)`;
  };

  render() {
    return (
      <nav
        class={`nav ${this.darkmode ? 'dark-mode' : ''}`}
        role="slider"
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow="0"
        aria-orientation="vertical"
        aria-valuetext=""
        onMouseEnter={() => {
          this.show = true;
        }}
        onMouseLeave={() => {
          this.show = false;
        }}
        ref={el => (this.navElement = el)}
      >
        <div class={`inner ${this.show ? 'show' : ''}`} onMouseMove={e => this.onTvnInnerMouseMove(e)}>
          <div class="background">
            <div class="list"></div>
            <div class="current-date-underline" ref={el => (this.currentDateUnderlineElement = el)}></div>
            <div class="current-time-line"></div>
            <div class="current-date" ref={el => (this.currentDateElement = el)}>
              <div class="current-date-label">{Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short' }).format(this.datesArray[0])}</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
