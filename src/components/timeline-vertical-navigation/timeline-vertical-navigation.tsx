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
  minDate: Date;
  maxDate: Date;

  @State() show: boolean = false;
  @State() movingRatio: number = 0;

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
        .map(date => {
          const formatedDate = new Date(date);
          if (!this.minDate || formatedDate.getTime() < this.minDate.getTime()) this.minDate = formatedDate;
          if (!this.maxDate || formatedDate.getTime() > this.maxDate.getTime()) this.maxDate = formatedDate;
          return formatedDate;
        });
    }
  }

  onInnerMouseMove = e => {
    const currentDateHeight = this.currentDateElement.clientHeight;
    const min = 0;
    const max = this.navElement.clientHeight - currentDateHeight * 2;
    const translateY = Math.min(Math.max(e.offsetY - currentDateHeight, min), max);
    this.currentDateUnderlineElement.style.transform = this.currentDateElement.style.transform = `translateY(${translateY}px)`;
    this.movingRatio = (translateY - min) / (max - min);
  };

  getDateClothestToRatio = () => {
    const dateRatio = this.minDate.getTime() + this.movingRatio * (this.maxDate.getTime() - this.minDate.getTime());
    const closestDate = this.datesArray.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.getTime() - dateRatio);
      const currDiff = Math.abs(curr.getTime() - dateRatio);
      return prevDiff < currDiff ? prev : curr;
    });
    return closestDate;
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
        <div class={`inner ${this.show ? 'show' : ''}`} onMouseMove={e => this.onInnerMouseMove(e)}>
          <div class="background">
            <div class="list"></div>
            <div class="current-date-underline" ref={el => (this.currentDateUnderlineElement = el)}></div>
            <div class="current-time-line"></div>
            <div class="current-date" ref={el => (this.currentDateElement = el)}>
              <div class="current-date-label">
                {Intl.DateTimeFormat(undefined, {
                  year: 'numeric',
                  month: 'short',
                }).format(this.getDateClothestToRatio())}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
