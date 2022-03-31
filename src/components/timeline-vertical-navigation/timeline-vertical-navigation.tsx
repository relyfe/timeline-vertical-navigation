import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'timeline-vertical-navigation',
  styleUrl: 'timeline-vertical-navigation.css',
  shadow: true,
})
export class TimelineVerticalNavigation {
  navElement!: HTMLElement;
  currentDateUnderlineElement!: HTMLElement;
  currentDateElement!: HTMLElement;
  currentTimeLineElement!: HTMLElement;
  datesArray: Date[];
  minDate: Date;
  maxDate: Date;

  @State() show: boolean = false;
  @State() movingRatio: number = 0;
  @State() selectedRatio: number = 0;

  @Prop() dates!: string;
  @Prop() pinned: boolean = false;
  @Prop() darkmode: boolean = false;
  @Prop() lineartime: boolean = false;

  @Event() dateSelected: EventEmitter<Date>;

  componentWillLoad() {
    this.parseDates();
    window.addEventListener('resize', () => {
      this.onWindowResize();
    });
  }

  onWindowResize() {
    const ratio = this.show ? this.movingRatio : this.selectedRatio;
    const currentDateHeight = this.currentDateElement.clientHeight;
    const min = 0;
    const max = this.navElement.clientHeight - currentDateHeight * 2;
    this.currentTimeLineElement.style.transform = `translateY(${min + (max - min) * ratio}px)`;
    if (!this.show) {
      this.currentDateUnderlineElement.style.transform = this.currentDateElement.style.transform = this.currentTimeLineElement.style.transform;
    }
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
        })
        .sort((a, b) => (b.getTime() - a.getTime() > 0 ? 1 : -1));
    }
  }

  calculateOffsetAndRatio(offsetY) {
    const currentDateHeight = this.currentDateElement.clientHeight;
    const min = 0;
    const max = this.navElement.clientHeight - currentDateHeight * 2;
    const translateY = Math.min(Math.max(offsetY - currentDateHeight, min), max);
    return { translateY, ratio: (translateY - min) / (max - min) };
  }

  onInnerMouseMove = e => {
    const { translateY, ratio } = this.calculateOffsetAndRatio(e.offsetY);
    this.currentDateUnderlineElement.style.transform = this.currentDateElement.style.transform = `translateY(${translateY}px)`;
    this.movingRatio = ratio;
  };

  onNavMouseLeave = () => {
    this.currentDateUnderlineElement.style.transform = this.currentDateElement.style.transform = this.currentTimeLineElement.style.transform;
  };

  onInnerClick = e => {
    const { translateY, ratio } = this.calculateOffsetAndRatio(e.offsetY);
    this.currentTimeLineElement.style.transform = `translateY(${translateY}px)`;
    this.selectedRatio = ratio;
    const clothestDate = this.getDateClothestToRatio();
    this.dateSelected.emit(clothestDate);
  };

  getDateClothestToRatio = () => {
    const ratio = this.show ? this.movingRatio : this.selectedRatio;
    const dateRatio = this.minDate.getTime() + ratio * (this.maxDate.getTime() - this.minDate.getTime());

    if (this.lineartime) {
      return this.datesArray.reduce((prev, curr) => {
        const prevDiff = Math.abs(prev.getTime() - dateRatio);
        const currDiff = Math.abs(curr.getTime() - dateRatio);
        return prevDiff < currDiff ? prev : curr;
      });
    }

    const arrayRatio = (this.datesArray.length - 1) * ratio;
    return this.datesArray[Math.round(arrayRatio)];
  };

  render() {
    return (
      <nav
        class={`nav ${this.darkmode ? 'dark-mode' : ''}`}
        role="slider"
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow={this.selectedRatio}
        aria-orientation="vertical"
        aria-valuetext=""
        onMouseEnter={() => {
          this.show = true;
        }}
        onMouseLeave={() => {
          this.show = false;
          this.onNavMouseLeave();
        }}
        ref={el => (this.navElement = el)}
      >
        <div class={`inner ${this.show || this.pinned ? 'show' : ''}`} onMouseMove={e => this.onInnerMouseMove(e)} onClick={e => this.onInnerClick(e)}>
          <div class="background">
            <div class="list"></div>
            <div class="current-date-underline" ref={el => (this.currentDateUnderlineElement = el)}></div>
            <div
              class="current-time-line"
              ref={el => {
                this.currentTimeLineElement = el;
              }}
            ></div>
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
