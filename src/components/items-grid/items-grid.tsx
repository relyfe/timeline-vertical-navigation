import { Component, Event, EventEmitter, h, Method, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'items-grid',
  styleUrl: 'items-grid.css',
  shadow: true,
})
export class ItemsGrid {
  datesArray: Date[];
  minDate: Date;
  maxDate: Date;
  items = [];
  container: HTMLElement;
  preventOnScroll: boolean = false;

  @Prop() dates!: string;
  @Prop() smoothscroll: boolean = false;

  @Event() scrolledToDate: EventEmitter<Date>;

  componentWillLoad() {
    this.parseDates();
  }

  getDatePosition(date: Date) {
    let position = 0;
    const items = this.container.querySelectorAll('.item');
    items.forEach(item => {
      const li = item as HTMLElement;
      if (li.dataset.date === date.toUTCString()) position = li.offsetTop;
    });
    return position;
  }

  @Method()
  async scrollToDate(date: Date) {
    const position = this.getDatePosition(date);
    this.preventOnScroll = true;
    this.container.scrollTo({
      top: position,
      behavior: this.smoothscroll ? 'smooth' : 'auto',
    });
    setTimeout(() => {
      this.preventOnScroll = false;
    }, 50);
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
          const formatedDate = new Date(`${date} 00:00:00 UTC`);
          if (!this.minDate || formatedDate.getTime() < this.minDate.getTime()) this.minDate = formatedDate;
          if (!this.maxDate || formatedDate.getTime() > this.maxDate.getTime()) this.maxDate = formatedDate;
          return formatedDate;
        })
        .sort((a, b) => (b.getTime() - a.getTime() > 0 ? 1 : -1));
    }
  }

  getFirstVisibleDateAt(position) {
    const items = this.container.querySelectorAll('.item');
    let firstVisibleDate: Date;
    items.forEach(item => {
      const li = item as HTMLElement;
      if (!firstVisibleDate && li.offsetTop > position) firstVisibleDate = new Date(li.dataset.date);
    });
    return firstVisibleDate;
  }

  onScroll(e) {
    if (this.preventOnScroll) return;
    const firstVisibleDate = this.getFirstVisibleDateAt(e.target.scrollTop);
    this.scrolledToDate.emit(firstVisibleDate);
  }

  render() {
    return (
      <ul ref={el => (this.container = el)} onScroll={e => this.onScroll(e)}>
        {this.datesArray.map(date => (
          <li class="item" data-date={date.toUTCString()}>
            {Intl.DateTimeFormat(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(date)}
          </li>
        ))}
      </ul>
    );
  }
}
