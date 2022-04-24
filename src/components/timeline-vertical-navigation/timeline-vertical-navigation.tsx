import { Component, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';

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
  years: number[];
  minDate: Date;
  maxDate: Date;
  timeOutScroll: any;

  @State() isOver: boolean = false;
  @State() show: boolean = false;
  @State() movingRatio: number = 0;
  @State() selectedRatio: number = 0;
  @State() innerPressed: boolean = false;
  @State() dotsPosition: number[] = [];

  @Prop() dates!: string | Date[];
  @Prop() pinned: boolean = false;
  @Prop() darkmode: boolean = false;
  @Prop() opaquebackground: boolean = false;

  @Event() dateSelected: EventEmitter<Date>;

  componentWillLoad() {
    this.parseDates();
    window.addEventListener('resize', () => {
      this.onWindowResize();
    });
  }

  componentDidLoad() {
    this.onWindowResize();
  }

  onWindowResize() {
    const ratio = this.show ? this.movingRatio : this.selectedRatio;
    const currentDateHeight = this.currentDateElement.clientHeight;
    const min = 0;
    const max = this.navElement.clientHeight - currentDateHeight * 2;
    this.currentTimeLineElement.style.transform = `translateY(${min + (max - min) * ratio}px)`;
    this.currentDateUnderlineElement.style.transform = this.currentDateElement.style.transform = this.currentTimeLineElement.style.transform;
    const yearElements = this.navElement.getElementsByClassName('list-item-year');
    let previousPosition = -Infinity;
    let previousIndexRatio = 0;
    const dotsPosition: number[] = [];
    for (let yearIndex = 0; yearIndex < yearElements.length; yearIndex++) {
      const yearElement = yearElements[yearIndex] as HTMLElement;
      const labelElement = yearElement.getElementsByClassName('label-year')[0] as HTMLElement;
      const year = Number(yearElement.dataset.year);
      const firstDateOfYear = this.getFirstDateOfYear(year);
      previousIndexRatio = this.getIndexRatioByDate(firstDateOfYear);
      const position = min + (max - min) * previousIndexRatio;
      const visible = position > previousPosition + labelElement?.clientHeight;
      yearElement.style.visibility = visible ? 'visible' : 'hidden';
      yearElement.style.transform = `translateY(${position}px)`;
      if (previousPosition !== -Infinity) dotsPosition.push(...this.getDotsPosition(previousPosition, position));
      previousPosition = position;
    }
    this.dotsPosition = dotsPosition;
  }
  getDotsPosition = (previousPosition, position) => {
    const dotHeight = 12;
    const dotsCount = Math.floor((position - 25 - previousPosition) / dotHeight);
    const positions = [];
    for (let dotIndex = 0; dotIndex < dotsCount; dotIndex++) {
      positions.push(dotIndex * dotHeight + previousPosition + 25);
    }
    return positions;
  };

  getFirstDateOfYear(year: number) {
    return this.datesArray.find(date => date.getFullYear() === year);
  }

  @Method()
  async updateSelectedDate(date: Date) {
    this.selectedRatio = this.movingRatio = this.getIndexRatioByDate(date);
    this.onWindowResize();
    this.show = true;
    if (this.timeOutScroll) clearTimeout(this.timeOutScroll);
    this.timeOutScroll = setTimeout(() => {
      if (!this.isOver) this.show = false;
    }, 3000);
  }

  getIndexRatioByDate(date: Date) {
    const index = this.datesArray.findIndex(d => d.toString() == date.toString());
    return index / (this.datesArray.length - 1);
  }

  @Watch('dates')
  parseDates() {
    if (!this.dates) return;
    switch (typeof this.dates) {
      case 'string':
        const cleanedDatesString = this.dates.replace(/\s|\[|\]/g, '');
        this.datesArray = cleanedDatesString.split(',').map(date => new Date(`${date} 00:00:00 UTC`));
        break;
      case 'object':
        this.datesArray = this.dates as Date[];
        break;
    }
    this.datesArray = this.datesArray.sort((a, b) => (b.getTime() - a.getTime() > 0 ? 1 : -1));
    this.minDate = this.datesArray[this.datesArray.length - 1];
    this.maxDate = this.datesArray[0];
    this.years = Array.from(new Set(this.datesArray.map(date => date.getFullYear())));
  }

  calculateOffsetAndRatio(offsetY) {
    const currentDateHeight = this.currentDateElement.clientHeight;
    const min = 0;
    const max = this.navElement.clientHeight - currentDateHeight * 2;
    const translateY = Math.min(Math.max(offsetY - currentDateHeight, min), max);
    return { translateY, ratio: (translateY - min) / (max - min) };
  }

  onInnerMouseMove = e => {
    this.onInnerMove(e.offsetY);
  };
  onInnerTouchMove = e => {
    e.preventDefault();
    this.onInnerMove(this.getTouchOffsetY(e));
  };
  onInnerMove = offsetY => {
    const { translateY, ratio } = this.calculateOffsetAndRatio(offsetY);
    this.currentDateUnderlineElement.style.transform = this.currentDateElement.style.transform = `translateY(${translateY}px)`;
    this.movingRatio = ratio;
    if (this.innerPressed) this.onInnerDown(offsetY);
  };

  onInnerMouseDown = e => {
    this.onInnerDown(e.offsetY);
  };
  getTouchOffsetY = e => {
    return e.touches[0].clientY - e.target.getBoundingClientRect().y;
  };
  onInnerTouchDown = e => {
    this.onInnerDown(this.getTouchOffsetY(e));
  };
  onInnerDown = offsetY => {
    this.innerPressed = true;
    const { translateY, ratio } = this.calculateOffsetAndRatio(offsetY);
    this.currentTimeLineElement.style.transform = `translateY(${translateY}px)`;
    this.selectedRatio = ratio;
    const clothestDate = this.getDateClothestToRatio();
    this.dateSelected.emit(clothestDate);
  };

  onInnerUp = () => {
    this.innerPressed = false;
  };

  onNavMouseLeave = () => {
    this.currentDateUnderlineElement.style.transform = this.currentDateElement.style.transform = this.currentTimeLineElement.style.transform;
  };

  getDateClothestToRatio = () => {
    const ratio = this.show ? this.movingRatio : this.selectedRatio;
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
        onTouchStart={() => {
          this.isOver = true;
        }}
        onTouchEnd={() => {
          this.isOver = false;
        }}
        onMouseEnter={() => {
          this.isOver = true;
          this.show = true;
        }}
        onMouseLeave={() => {
          this.isOver = false;
          this.show = false;
          this.onNavMouseLeave();
        }}
        ref={el => (this.navElement = el)}
      >
        <div
          class={`inner ${this.show || this.pinned ? 'show' : ''}`}
          onMouseMove={e => this.onInnerMouseMove(e)}
          onTouchMove={e => this.onInnerTouchMove(e)}
          onMouseDown={e => this.onInnerMouseDown(e)}
          onTouchStart={e => this.onInnerTouchDown(e)}
          onMouseUp={() => this.onInnerUp()}
          onTouchEnd={() => this.onInnerUp()}
        >
          <div class={`${this.opaquebackground ? 'background' : ''}`}>
            <div class="list">
              {this.years.map(year => (
                <div class="list-item list-item-year" data-year={year}>
                  <div class="label-year">{year}</div>
                </div>
              ))}
              {this.dotsPosition.map(position => (
                <div class="list-item list-item-dot" style={{ transform: `translateY(${position}px)` }}>
                  <div class="dot"></div>
                </div>
              ))}
            </div>
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
